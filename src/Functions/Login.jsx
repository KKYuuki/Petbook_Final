import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Form, Button, Card } from "react-bootstrap"; // Using React-Bootstrap components
import "./Css/Login.css"; // Import your custom CSS for styling

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Example: If login is successful
    const user = { email }; // Just an example, replace with actual data
    onLoginSuccess(user);
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to SignUp page when the user clicks "Sign Up"
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h3 className="text-center">Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-btn">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button 
              variant="link" 
              onClick={handleSignUpRedirect} 
              className="signup-link"
            >
              Sign Up
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
