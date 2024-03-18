document.addEventListener('DOMContentLoaded', function() {
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
                const response = JSON.parse(xhr.responseText);
                const messagesHtml = response.map(entry => `<p><strong>${entry.username}</strong> from ${entry.country}: ${entry.message}</p>`).join('');
                document.getElementById('ajax-response').innerHTML = messagesHtml;
            } else {
                console.error('Request failed. Status:', xhr.status);
            }
        };

        xhr.send(JSON.stringify({ username, country, message }));
    });
});
