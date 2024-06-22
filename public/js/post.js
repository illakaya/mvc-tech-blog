const newPostHandler = async (event) => {
  event.preventDefault();
  // retrieve from the DOM the content for the new post
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();
  const userId = document.querySelector('.post-form').dataset.userid;
  // if there is content for a new post
  if (title && text) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, text, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if the response was ok, redirect the user to the homepage
    // otherwise alert the user that log in failed
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to create new post.');
    }
  }
};

document.querySelector('.post-form').addEventListener('submit', newPostHandler);
