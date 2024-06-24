const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// Import the custom middleware
const auth = require('../utils/auth');

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
    // convert the object into a plainer object where it is much easier to read the attributes
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // render the homepage with the info retrieved
    res.render('homepage', {
      posts,
      // create variable for handlebars to display login/logout
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET one post
// add custom middleware to redirect
router.get('/post/:id', async (req, res) => {
  // View the post
  try {
    // retrieve the post info
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          // retrieve the user that wrote the post
          model: User,
          attributes: ['id', 'username'],
        },
        {
          // retrieve the comments of the post
          model: Comment,
          attributes: ['id', 'text', 'date', 'user_id'],
          include: [
            {
              // retrieve the user that wrote the comment
              model: User,
              attributes: ['id', 'username'],
            },
          ],
        },
      ],
    });
    // render the post page with the info retrieved
    const post = dbPostData.get({ plain: true });
    res.render('post', { 
      post, 
      loggedIn: req.session.loggedIn, 
      userId: req.session.userId });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// for the login endpoint, show the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // render the login page
  res.render('login');
});

// GET all user posts for dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.session.userId,
      },
    });
    // convert the object into a plainer object where it is much easier to read the attributes
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // render the homepage with the info retrieved
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// for the create endpoint, show the create new post page
router.get('/create', auth, (req, res) => {
  try {
    // render the create new post page
    res.render('create', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }  
});

// for the edit endpoint, show the post that was clicked on
router.get('/dashboard/post/:id', async (req, res) => {
  try {
    // retrieve the post info
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          // retrieve the user that wrote the post
          model: User,
          attributes: ['id', 'username'],
        },
        {
          // retrieve the comments of the post
          model: Comment,
          attributes: ['id', 'text', 'date', 'user_id'],
          include: [
            {
              // retrieve the user that wrote the comment
              model: User,
              attributes: ['id', 'username'],
            },
          ],
        },
      ],
    });
    // render the post page with the info retrieved
    const post = dbPostData.get({ plain: true });
    res.render('edit', { 
      post, 
      loggedIn: req.session.loggedIn, 
      userId: req.session.userId });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
