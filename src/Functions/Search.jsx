import { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';  // Importing Bootstrap components
import '../Functions/Css/Search.css';

function Search() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      setUserData(response.data);
      setError('');
    } catch (err) {
      setUserData(null);
      if (err.response && err.response.status === 404) {
        setError('User not found. Please check the username and try again.');
      } else {
        setError('Error fetching user data. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='SearchT'>
        <input
          className='SearchBar'
          placeholder='Pet Search'
          id='SearchPet'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='SearchButt' onClick={handleSearch}>SEARCH</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      {userData && (
        <div className="user-profile-card">
          <Card className="profile-card">
            <Card.Header className="text-center">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <div className="profile-picture-placeholder">No Picture</div>
              )}
              <h3 className="profile-petname">{userData.username}</h3>
              <p className="profile-status">{userData.bio}</p>
            </Card.Header>
            <Card.Body className="text-center">
              <Button variant="primary">View Profile</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default Search;
