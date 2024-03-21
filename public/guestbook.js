document.addEventListener("DOMContentLoaded", function() {
  fetch('guestbook.json')
    .then(response => response.json())
    .then(data => {
      const guestbookTable = document.getElementById('guestbookTable');
      const tbody = guestbookTable.querySelector('tbody');

      data.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${entry.id}</td>
          <td>${entry.username}</td>
          <td>${entry.country}</td>
          <td>${entry.date}</td>
          <td>${entry.message}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error('Error fetching guestbook data:', error));
});