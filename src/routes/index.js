const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');
const permissionRoute = require('./permissionRoute');
const router = express.Router();

const defaultRoutes = [
   {
      path: '/auth',
      route: authRoute,
   },
   {
      path: '/user',
      route: userRoute,
   },
   {
      path: '/role',
      route: roleRoute,
   },
   {
      path: '/permission',
      route: permissionRoute,
   },
];

defaultRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

module.exports = router