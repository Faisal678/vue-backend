const User = require('../models/userModel');
const Role = require('../models/roleModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Register the user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ success: false, message: "Email already exists" })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = new User({ ...req.body, password: hashedPassword });
      await data.save();
      return res.status(200).json({ success: true, message: "User Created Successfully" })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

// Login the admin
exports.adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: user
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login the user
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    const roleData = await Role.findById(user.roleId)
    if (roleData.name === "admin" || roleData.name === "sub-admin") {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: user
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout the user
exports.logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
