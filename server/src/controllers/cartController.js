import User from "../models/userModel.js";

export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.productId");
  res.json(user.cart);
};


export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);

  const existing = user.cart.find(
    (item) => item.productId.toString() === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }

  await user.save();
  res.json(user.cart);
};


export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);

  user.cart = user.cart.map((item) =>
    item.productId.toString() === productId
      ? { ...item, quantity }
      : item
  );

  await user.save();
  res.json(user.cart);
};


export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user.id);

  user.cart = user.cart.filter(
    (item) => item.productId.toString() !== productId
  );

  await user.save();
  res.json(user.cart);
};