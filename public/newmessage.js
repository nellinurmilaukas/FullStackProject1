document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('success-message');

    document.getElementById('ajax-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById('username').value;
        const country = document.getElementById('country').value;
        const message = document.getElementById('message').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/ajaxmessage');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                successMessage.style.display = 'block'; // Show success message
                setTimeout(function() {
                    successMessage.style.display = 'none'; // Hide success message after 3 seconds
                }, 3000);
            } else {
                console.error('Request failed. Status:', xhr.status);
            }
        };

        xhr.send(JSON.stringify({ username, country, message }));
    });
});
