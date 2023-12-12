const commentPostHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#comment-details-keyed').value.trim();
    var currentUrl = window.location.pathname;
    console.log(currentUrl);
  
    const parseCurrentUrl = currentUrl.split('/');
    var postId = parseInt(parseCurrentUrl[parseCurrentUrl.length - 1]);
  
    const comment_url = `/api/posts/${postId}/comments`;
  
    try {
      const response = await fetch(comment_url, {
        method: 'POST',
        body: JSON.stringify({
          comment: description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('response in submit comment', response);
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
  document
  .querySelector('.comment-form')
  .addEventListener('submit', commentPostHandler);
  