import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

// Set the GROQ API key
process.env.GROQ_API_KEY = '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';

const app = express();
const port = 5000;

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for image file upload with dynamic file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userPfpDir = path.join(__dirname, 'UserPFP'); // Directory for user profile pictures
    if (!fs.existsSync(userPfpDir)) {
      fs.mkdirSync(userPfpDir); // Create the directory if it doesn't exist
    }
    cb(null, userPfpDir); // Store files in the 'UserPFP' folder
  },
  filename: (req, file, cb) => {
    // Generate a temporary filename to save the file before inserting user into DB
    cb(null, Date.now() + path.extname(file.originalname)); // Temporary unique filename
  },
});
const upload = multer({ storage });

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'kenneth',
  database: 'petbook',
});

// Test MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// POST endpoint for chat interaction with GROQ API
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Get the GROQ API key from environment variables
  const groqApiKey = process.env.GROQ_API_KEY;

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = groqResponse.data.choices[0].message.content.trim();
    console.log('AI Response:', aiResponse);
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(
      'Error communicating with GROQ API:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Something went wrong with the server.' });
  }
});

// POST endpoint for user signup
app.post('/signup', upload.single('profilePicture'), (req, res) => {
  const { username, email, password, name, bio } = req.body;
  const profilePicture = req.file ? req.file.path : null; // Get the temporary file path if uploaded

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  // Insert the new user into the database first
  const query = 'INSERT INTO users (username, email, password, name, bio, profilePicture) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, email, password, name, bio, profilePicture];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      return res.status(500).json({ message: 'Error signing up. Please try again.' });
    }

    // After user is inserted, update the file with UserID
    const userId = result.insertId; // Get the generated user ID
    const newProfilePicPath = path.join(__dirname, 'UserPFP', `${userId}${path.extname(profilePicture)}`);

    // Rename the file to match the UserID
    fs.rename(profilePicture, newProfilePicPath, (err) => {
      if (err) {
        console.error('Error renaming profile picture:', err);
        return res.status(500).json({ message: 'Error saving profile picture. Please try again.' });
      }

      // Update the user record with the new profile picture path
      const updateQuery = 'UPDATE users SET profilePicture = ? WHERE UserID = ?';
      db.query(updateQuery, [newProfilePicPath, UserId], (err) => {
        if (err) {
          console.error('Error updating profile picture in DB:', err);
          return res.status(500).json({ message: 'Error saving profile picture. Please try again.' });
        }
        res.status(200).json({ message: 'Sign up successful!' });
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
