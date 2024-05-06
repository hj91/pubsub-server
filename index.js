/**

 pubsub-server/index.js Copyright 2024 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let subjects = {};

// Load settings from settings.conf
let settings;
try {
    const settingsFile = fs.readFileSync('settings.conf', 'utf8');
    settings = JSON.parse(settingsFile);
} catch (error) {
    console.error('Error reading settings:', error);
    process.exit(1); // Exit if settings cannot be read
}

// Publisher endpoint
app.post('/publish/:busID/:subject', (req, res) => {
    try {
        const { busID, subject } = req.params;
        const data = req.body;

        const key = `${busID}/${subject}`;
        subjects[key] = subjects[key] || [];
        subjects[key].push(data);

        // Save subjects to file
        saveSubjectsToFile();

        // Inform subscribers
        res.status(200).send('Published successfully');
    } catch (error) {
        console.error('Error publishing data:', error);
        res.status(500).send('Error publishing data');
    }
});

// Subscriber endpoint
app.get('/subscribe/:busID/:subject', (req, res) => {
    try {
        const { busID, subject } = req.params;
        const key = `${busID}/${subject}`;
        const data = subjects[key] || [];

        res.json(data);

        // Clear data after sending to subscriber
        subjects[key] = [];

        // Save subjects to file
        saveSubjectsToFile();
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).send('Error subscribing');
    }
});

// Central subject repository endpoint
app.get('/subjects/:busID/:subject', (req, res) => {
    try {
        const { busID, subject } = req.params;
        const key = `${busID}/${subject}`;
        if (subjects[key]) {
            res.status(200).json({ subscribed: true });
        } else {
            res.status(404).json({ subscribed: false });
        }
    } catch (error) {
        console.error('Error retrieving subject:', error);
        res.status(500).send('Error retrieving subject');
    }
});

// Function to save subjects to file
function saveSubjectsToFile() {
    try {
        fs.writeFileSync('subjects.json', JSON.stringify(subjects));
    } catch (error) {
        console.error('Error saving subjects to file:', error);
    }
}

// Run the server
const PORT = settings.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

