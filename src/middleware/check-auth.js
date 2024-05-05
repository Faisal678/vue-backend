const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   try {
      const token = req.headers.token.split(' ')[1];
      console.log(token);
      if (!token) return res.status(403).send("Access denied.");
      const decoded = jwt.verify(token, "abc123");
      req.useData = decoded;
      next()
   } catch (error) {
      res.status(400).send("Invalid token");
   }
};