// Get the current URL
var currentUrl = window.location.pathname;
console.log(currentUrl);

// Parse the current URL to extract the post ID
const parsedCurrentUrl = currentUrl.split('/');
const postId = parseInt(parsedCurrentUrl[parsedCurrentUrl.length - 1]);

// Construct the API request URL using the extracted postId
const req_url = `/api/posts/${postId}`;

// Handler function for updating a post
const postUpdateHandler = async (event) => {
  event.preventDefault();

  // Get the values of the updated post title and description from the input fields
  const description = document.querySelector('#post-details-input').value.trim();
  const title = document.querySelector('#title-input').value.trim();

  // Check if both title and description are provided
  if (description && title) {
    try {
      // Send a PUT request to update the post
      const response = await fetch(req_url, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          content: description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Redirect to the dashboard after successful update
        document.location.replace('/dashboard');
      } else {
        // Display an alert with the error status text
        alert(response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating post:', error);
    }
  }
};

// Handler function for deleting a post
const postDeleteHandler = async (event) => {
  event.preventDefault();

  try {
    // Send a DELETE request to delete the post
    const response = await fetch(req_url, {
      method: 'DELETE',
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Reload the page after successful deletion
      document.location.reload();
    } else {
      // Display an alert with the error status text
      alert(response.statusText);
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error deleting post:', error);
  }
};

// Attach the postUpdateHandler function to the form's submit event
document.querySelector('.post-update').addEventListener('submit', postUpdateHandler);

// Attach the postDeleteHandler function to the form's submit event
document.querySelector('.post-delete').addEventListener('submit', postDeleteHandler);
