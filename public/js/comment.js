const newCommentHandler = async (event) => {
  event.preventDefault();
  // retrieve from the DOM the text for the new comment
  const text = document.querySelector('#text-comment').value.trim();
  const postId = document.getElementById('post').dataset.postid;
  const userId = document.querySelector('.comment-form').dataset.userid;
  // if there is text for a new comment
  if (text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text, postId, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if the response was ok, redirect the user to the homepage
    // otherwise alert the user that log in failed
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to add comment.');
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', newCommentHandler);
