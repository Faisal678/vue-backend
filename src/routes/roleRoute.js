const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.route('/')
   .get(roleController.getAllRoles)
   .post(roleController.createRole);

router.route('/:id')
   .get(roleController.getRoleById)
   .put(roleController.updateRoleById)
   .delete(roleController.deleteRoleById);

module.exports = router;
