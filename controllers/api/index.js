const router = require('express').Router();

// require Routes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


// for endpoints involving users, refer to userRoutes.js file
router.use('/users', userRoutes);
// for endpoints involving posts, refer to postRoutes.js file
router.use('/posts', postRoutes);
// for endpoints involving comments, refer to commentRoutes.js file
router.use('/comments', commentRoutes);

module.exports = router;
