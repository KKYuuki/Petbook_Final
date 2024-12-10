import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Css/Profile.css';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching the profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is saved in localStorage after login
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchProfileData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="profile-page">
      <Card className="profile-card">
        <Card.Header className="text-center">
          <img
            src={`http://localhost:5000/UserPFP/${profileData.profilePicture}`} // Assume the filename matches the UserID
            alt="Profile"
            className="profile-picture profile-paw-heart"
          />
          <h3 className="profile-petname">{profileData.username}</h3>
          <p className="profile-status">{profileData.bio}</p>
          {/* Edit Profile Button */}
          <div className="profile-edit-container">
            <Button variant="primary" className="profile-edit-button">
              Edit Profile
            </Button>
          </div>
        </Card.Header>
      </Card>
    </div>
  );
}

export default ProfilePage;
