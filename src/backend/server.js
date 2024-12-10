import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = 5000;

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (profile pictures)
app.use('/UserPFP', express.static(path.join(__dirname, 'UserPFP')));

// Set up multer for handling profile picture upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'UserPFP'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// GET endpoint for user's own profile
app.get('/api/profile', verifyToken, (req, res) => {
  const userId = req.user.UserID;

  const query = 'SELECT username, name, bio, profilePicture FROM users WHERE UserID = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    const user = results[0];
    const profileData = {
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profilePicture
    };

    res.status(200).json(profileData);
  });
});

// POST endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const query = 'SELECT UserID, username, name, bio, profilePicture, password AS hashedPassword FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ UserID: user.UserID, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful!',
        token,
        user: {
          UserID: user.UserID,
          username: user.username,
          name: user.name,
          bio: user.bio,
          profilePicture: user.profilePicture,
        },
      });
    });
  });
});

// POST endpoint for user signup
app.post('/signup', upload.single('profilePicture'), (req, res) => {
  const { username, email, password, name, bio } = req.body;

  if (!username || !email || !password || !name) {
    return res.status(400).json({ message: 'Username, email, password, and name are required.' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const insertQuery = `
      INSERT INTO users (username, email, password, name, bio)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [username, email, password, name, bio], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user. Please try again.' });
      }

      const userId = results.insertId;

      let profilePictureUrl = null;
      if (req.file) {
        profilePictureUrl = `http://localhost:5000/UserPFP/${req.file.filename}`;
        const updateQuery = 'UPDATE users SET profilePicture = ? WHERE UserID = ?';
        db.query(updateQuery, [profilePictureUrl, userId], (err) => {
          if (err) {
            console.error('Error updating profile picture:', err);
          }
        });
      }

      const token = jwt.sign({ UserID: userId, username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      res.status(201).json({
        message: 'User successfully registered!',
        token,
        user: {
          UserID: userId,
          username,
          name,
          bio,
          profilePicture: profilePictureUrl,
        },
      });
    });
  });
});

app.get('/api/profile', verifyToken, (req, res) => {
  const userId = req.user.UserID;
  
  const query = 'SELECT username, name, bio, profilePicture FROM users WHERE UserID = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    const user = results[0];
    res.status(200).json({
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePicture: user.profilePicture
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
