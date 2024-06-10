// create function that will deal with logging in
// when the event occurs (form is submitted)
// prevent the page from refreshing
const loginFormHandler = async (event) => {
  event.preventDefault();
  // retrieve from the DOM the username and password entered
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // if there are both a username and password
  if (username && password) {
    // post the info to the specified end point
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if the response was ok, redirect the user to the homepage
    // otherwise alert the user that log in failed
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

// create function that will deal with creating a new user
// when the event occurs (form is submitted)
// prevent the page from refreshing
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // retrieve from the DOM the username and password entered
  if (username && password) {
    // post the info to the specified end point
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if the response was ok, redirect the user to the homepage
    // otherwise alert the user that sign up failed
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// add event listeners to both forms
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
