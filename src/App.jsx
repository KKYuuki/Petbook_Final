import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Nav.jsx";
import SuggestedPets from "./Components/SuggestedPets.jsx";
import Home from "./Functions/Home.jsx";
import Search from "./Functions/Search.jsx";
import Create from "./Functions/Create.jsx";
import Notif from "./Functions/Notification.jsx";
import Profile from "./Functions/Profile.jsx";
import SignUp from "./Functions/SignUp.jsx";
import Login from "./Functions/Login.jsx";
import ChatBox from "./Components/ChatBox";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated (e.g., token exists in localStorage)
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Container>
            <Row>
              <Col>
                <Nav onLogout={handleLogout} /> {/* Assuming Nav component handles logout */}
              </Col>
              <Col xs={6}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/notifications" element={<Notif />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
              </Col>
              <Col>
                <SuggestedPets />
              </Col>
            </Row>
          </Container>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Redirect to Login page if the user is not authenticated */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
