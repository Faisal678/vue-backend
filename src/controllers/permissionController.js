const Permission = require('../models/permissionModel');

// Get all permissions
exports.getAllPermissions = async (req, res) => {
   try {
      const permissions = await Permission.find().sort({ createdAt: -1 });
      res.status(200).json(permissions);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Get a single permission by ID
exports.getPermissionById = async (req, res) => {
   try {
      const permission = await Permission.findById(req.params.id);
      if (!permission) {
         return res.status(404).json({ message: 'Permission not found' });
      }
      res.status(200).json(permission);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Create a new permission
exports.createPermission = async (req, res) => {
   try {
      const { name } = req.body;
      const existingPermission = await Permission.findOne({ name });
      if (existingPermission) {
         return res.status(400).json({ message: 'Permission already exists' });
      }
      const permission = new Permission(req.body);
      await permission.save();
      res.status(201).json({ message: 'Permission created successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Update a permission by ID
exports.updatePermissionById = async (req, res) => {
   try {
      const updatedPermission = await Permission.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      if (!updatedPermission) {
         return res.status(404).json({ message: 'Permission not found' });
      }
      res.status(200).json({ message: 'Permission updated successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Delete a permission by ID
exports.deletePermissionById = async (req, res) => {
   try {
      const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
      if (!deletedPermission) {
         return res.status(404).json({ message: 'Permission not found' });
      }
      res.status(200).json({ message: 'Permission deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
