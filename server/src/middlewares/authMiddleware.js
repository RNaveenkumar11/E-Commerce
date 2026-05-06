import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    const token = authHeader.split(" ")[1];

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" })
    }
}

export default verifyToken