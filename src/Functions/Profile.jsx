import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../Components/Profile.css'; // Make sure to import the updated CSS file

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  // Simulating fetching profile data (replace with API call)
  useEffect(() => {
    const fetchProfileData = () => {
      const data = {
        username: 'TantoBoy',
        bio: 'A cutie and aggresive baby.',
        profilePicture: 'https://example.com/path-to-profile-picture.jpg', // Replace with your image URL
      };
      setProfileData(data);
    };

    fetchProfileData();
  }, []);

  // Loading state
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Card className="profile-card">
        <Card.Header className="text-center">
          <img
            src={profileData.profilePicture}
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
