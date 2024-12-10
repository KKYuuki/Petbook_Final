import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap'; // Using React-Bootstrap components
import '../Components/Profile.css'; // Assuming this file contains your card styling

const Signup = () => {
  // State to hold form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle both text data and files
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Append the file
    }

    try {
      // Send POST request to the backend with FormData
      const response = await axios.post('http://localhost:5000/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Handle successful signup
      alert(response.data.message);
    } catch (error) {
      // Handle error
      console.error(error);
      alert('Error signing up. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Store the selected file
  };

  return (
    <div className="signup-page">
      <Card className="profile-card">
        <Card.Header className="text-center">
          <h3>Sign Up</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </Form.Group>
            
            {/* File input for profile picture */}
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*" // Only allow image files
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" className="profile-edit-button">
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
