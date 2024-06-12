const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');


// for endpoints involving users, refer to userRoutes.js file
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
