const editPostHandler = async (event) => {
  event.preventDefault();
  // retrieve from the DOM the content for the new post
  const title = document.querySelector("#edit-title").value.trim();
  const text = document.querySelector("#edit-text").value.trim();
  const postId = document.getElementById("post-edit").dataset.postid;
  // if there is content for a new post
  if (title && text) {
    console.log("testing post");
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });
    // if the response was ok, redirect the user to the homepage
    // otherwise alert the user that log in failed
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Failed to update post.");
    }
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();
  // retrieve the post id
  const postId = document.getElementById("post-edit").dataset.postid;
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  // if the response was ok, redirect the user to the homepage
  // otherwise alert the user that log in failed
  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Failed to delete post.");
  }
};

document.getElementById("delete").addEventListener("click", deletePostHandler);
document.querySelector(".edit-form").addEventListener("submit", editPostHandler);
