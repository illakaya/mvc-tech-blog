const router = require('express').Router();

const userRoutes = require('./userRoutes');

// for endpoints involving users, refer to userRoutes.js file
router.use('/users', userRoutes);

module.exports = router;
