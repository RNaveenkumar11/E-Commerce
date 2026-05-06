
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import User from '../models/userModel.js'


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
       role: "user"  
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        const role = user.role;
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role , name:user.name},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.status(200).json({
            message: "Login successful",
            token,
            role
        })
    } catch (err) {
        res.status(500).json({ message: "Error during login" })
    }
}