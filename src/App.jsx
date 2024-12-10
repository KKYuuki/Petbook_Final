import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav.jsx';
import SuggestedPets from './Components/SuggestedPets.jsx';
import Home from './Functions/Home.jsx';
import Search from './Functions/Search.jsx';
import Create from './Functions/Create.jsx';
import Notif from './Functions/Notification.jsx';
import Profile from './Functions/Profile.jsx';
import SignUp from './Functions/SignUp.jsx'; // Import the SignUp component
import ChatBox from './Components/ChatBox'; // Import ChatBox component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Row>
            <Col>
              {/* Pass pageIndicator and setPageIndicator as props */}
              <Nav />
            </Col>
            <Col xs={6}>
              {/* Render the component based on the current route */}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/notifications" element={<Notif />} />
                <Route path="/create" element={<Create />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Default route */}
                <Route path="/" element={<Home />} />
              </Routes>
            </Col>
            <Col>
              <SuggestedPets />
            </Col>
          </Row>
        </Container>

        {/* Add the ChatBox component here to display it on every page */}
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
