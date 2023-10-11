const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 35000;

const MAILDIR_PATH = "/path/to/your/Maildir/";  // Replace with your Maildir path

app.use(bodyParser.json());

app.get('/emails', async (req, res) => {
    try {
        // Read the new emails directory (for unread emails)
        const emailFiles = await fs.readdir(path.join(MAILDIR_PATH, 'new'));

        const emails = [];

        for (let file of emailFiles) {
            const emailContent = await fs.readFile(path.join(MAILDIR_PATH, 'new', file), 'utf8');
            emails.push(emailContent);
        }

        res.json({ success: true, emails: emails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
