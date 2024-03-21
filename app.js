//NODE SERVER

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Route to render the front page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to load and display guestbook entries
app.get('/guestbook', (req, res) => {
    res.sendFile(__dirname + '/public/guestbook.html');
});

// Route to render the form for adding new messages
app.get('/newmessage', (req, res) => {
    res.sendFile(__dirname + '/public/newmessage.html');
});

// Route to handle form submission and save new message
app.post('/newmessage', (req, res) => {
    const { username, country, message } = req.body;
    if (!username || !country || !message) {
        return res.status(400).send('All fields are required');
    }

    fs.readFile('data/guestbook.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading guestbook');
        }
        const guestbookEntries = JSON.parse(data);

        const newEntry = {
            id: (guestbookEntries.length + 1).toString(),
            username,
            country,
            date: new Date().toString(),
            message
        };
        guestbookEntries.push(newEntry);

        fs.writeFile('data/guestbook.json', JSON.stringify(guestbookEntries), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving message');
            }
            res.redirect('/guestbook');
        });
    });
});

// Route to render the AJAX message form
app.get('/ajaxmessage', (req, res) => {
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});

// Route to handle AJAX form submission
app.post('/ajaxmessage', (req, res) => {
    const { username, country, message } = req.body;
    if (!username || !country || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    fs.readFile('data/guestbook.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading guestbook' });
        }
        const guestbookEntries = JSON.parse(data);

        const newEntry = {
            id: (guestbookEntries.length + 1).toString(),
            username,
            country,
            date: new Date().toString(),
            message
        };
        guestbookEntries.push(newEntry);

        fs.writeFile('data/guestbook.json', JSON.stringify(guestbookEntries), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error saving message' });
            }
            res.json(guestbookEntries);
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
