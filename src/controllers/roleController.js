const Role = require('../models/roleModel');

// Get all roles
exports.getAllRoles = async (req, res) => {
   try {
      const roles = await Role.find();
      res.status(200).json(roles);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
   try {
      const role = await Role.findById(req.params.id);
      if (!role) {
         return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json(role);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Create a new role
exports.createRole = async (req, res) => {
   try {
      const role = new Role(req.body);
      const existingRole = await Role.findOne({ name: role.name });

      if (existingRole) {
         return res.status(400).json({ message: 'Role already exists' });
      }

      await role.save();
      res.status(201).json({ message: 'Role created successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Update a role by ID
exports.updateRoleById = async (req, res) => {
   try {
      const updatedRole = await Role.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      if (!updatedRole) {
         return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ message: 'Role updated successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Delete a role by ID
exports.deleteRoleById = async (req, res) => {
   try {
      const deletedRole = await Role.findByIdAndDelete(req.params.id);
      if (!deletedRole) {
         return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ message: 'Role deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
