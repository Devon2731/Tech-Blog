const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title-input').value.trim();
    const description = document.querySelector('#post-details-input').value.trim();

    if (title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.post-form').addEventListener('submit', postFormHandler);
