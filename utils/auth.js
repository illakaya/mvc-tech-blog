const auth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  // If the user is logged in, allow them to view the posts
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = auth;
