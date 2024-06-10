const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// TODO: Import the custom middleware
const { auth } = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      // we want to include the users name, so we retrieve that as well
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // convert the objct into a plainer object where it is much easier to read the attributes
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('post', {
      posts,
      // create variable for handlebars to display login/logout
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/*
// GET one post
// add custom middleware to redirect
router.get('/post/:id', auth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  // If the user is logged in, allow them to view the post
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'date', 'user_id'],
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
*/

// for the login endpoint, show the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // render the login page
  res.render('login');
});

module.exports = router;
