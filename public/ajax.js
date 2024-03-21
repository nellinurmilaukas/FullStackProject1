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
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (Array.isArray(response)) {
                        const messagesHtml = response.map(entry => 
                            `<p><strong>${entry.username || 'Unknown'}</strong> from ${entry.country || 'Unknown'}: ${entry.message || ''}</p>`
                        ).join('');
                        const ajaxResponseElement = document.getElementById('ajax-response');
                        if (ajaxResponseElement) {
                            ajaxResponseElement.innerHTML = messagesHtml;
                        } else {
                            console.error('Element with id "ajax-response" not found.');
                        }
                    } else {
                        console.error('Expected array response, received:', response);
                    }
                } catch (e) {
                    console.error('Failed to parse JSON response:', xhr.responseText);
                }
            } else {
                console.error('Request failed. Status:', xhr.status);
            }
        };

        xhr.send(JSON.stringify({ username, country, message }));
    });
});