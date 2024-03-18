
// Fetch the JSON data
fetch('guestbook.json')
  .then(response => response.json())
  .then(data => {
    // Get the div where entries will be displayed
    const guestbookEntriesDiv = document.getElementById('guestbookEntries');

    // Loop through the data and create HTML elements to display each entry
    data.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.innerHTML = `
        <p><strong>ID:</strong> ${entry.id}</p>
        <p><strong>Username:</strong> ${entry.username}</p>
        <p><strong>Country:</strong> ${entry.country}</p>
        <p><strong>Date:</strong> ${entry.date}</p>
        <p><strong>Message:</strong> ${entry.message}</p>
        <hr>
      `;
      guestbookEntriesDiv.appendChild(entryDiv);
    });
  })
  .catch(error => console.error('Error fetching guestbook data:', error));
