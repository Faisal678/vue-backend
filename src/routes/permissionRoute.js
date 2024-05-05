const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

router.route('/')
  .get(permissionController.getAllPermissions)
  .post(permissionController.createPermission);

router.route('/:id')
  .get(permissionController.getPermissionById)
  .put(permissionController.updatePermissionById)
  .delete(permissionController.deletePermissionById);

module.exports = router;
