const router = require('express').Router();

// To have /api mounted onto /users
router.use('/users', require('./user'));

// Error Handling
router.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  next(error);
});

module.exports = router;
