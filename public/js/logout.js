// create a function to logout when the log out button is clicked
const logout = async () => {
  // send a signal to the specified end point
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // if the response was ok, redirect the user to the homepage
  // otherwise alert the user that logging out has failed
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// add event listener
document.querySelector('#logout').addEventListener('click', logout);
