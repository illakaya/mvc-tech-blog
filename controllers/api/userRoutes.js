// initialise express
const router = require('express').Router();
// retrieve the User model
const { User } = require('../../models');

// create a new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // find by matching the username
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // if there is no user in the database or incorrect password, inform the user to try again 
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    // if they log in, store the variable loggedIn and set the value to the boolean true
    // it will be used for handlebars if else view
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Logout
// destroy the variable that states that the user is logged in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
