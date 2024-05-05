const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
// exports.createUser = async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Update a user
exports.updateUserById = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
