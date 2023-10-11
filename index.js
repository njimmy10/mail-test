const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 35000;

const MAILDIR_PATH = "home/asynk/mail/asynk.tech/jnoujaim";  // Replace with your Maildir path

app.use(bodyParser.json());

app.get('/emails', async (req, res) => {
    try {
        
        const directories = ['cur'];
        const emails = [];

        for (let dir of directories) {
            const emailFiles = await fs.readdir(path.join(MAILDIR_PATH, dir));

            for (let file of emailFiles) {
                const emailContent = await fs.readFile(path.join(MAILDIR_PATH, dir, file), 'utf8');
                emails.push(emailContent);
            }
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
