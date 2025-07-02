import User from "../models/User.js"

export const register = async (req, res) => {
  try {
    const { name, email, username, password, mobile } = req.body;
    const avatar = req.files?.avatar;

    let avatarPath = "default.png";
    if (avatar) {
      avatarPath = Date.now() + "_" + avatar.name;
      await avatar.mv(`uploads/${avatarPath}`);
    }

    const user = new User({ name, email, username, password, mobile, avatar: avatarPath });
    await user.save();
    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};