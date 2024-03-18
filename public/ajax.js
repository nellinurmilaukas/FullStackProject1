document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ajax-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collect form data
        const username = document.getElementById('ajax-username').value;
        const country = document.getElementById('ajax-country').value;
        const message = document.getElementById('ajax-message').value;

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST', '/ajaxmessage');
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Set up the callback function
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const messagesHtml = response.map(entry => `<p><strong>${entry.username}</strong> from ${entry.country}: ${entry.message}</p>`).join('');
                document.getElementById('ajax-response').innerHTML = messagesHtml;
            } else {
                console.error('Request failed. Status:', xhr.status);
            }
        };

        // Send the request with form data
        xhr.send(JSON.stringify({ username, country, message }));
    });
});
