import React, { useState, useEffect } from 'react';
import './Css/Profile.css';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backupData = {
    username: "Practice3",
    bio: "this is a practice dummy",
    profilePicture: "/UserPFP/profilePicture-1733867955656.jpeg"
  };  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile data');
        }

        setProfileData(data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setProfileData(backupData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <span className="profile-label">Profile</span>
        <div className="profile-content">
          {profileData?.profilePicture ? (
            <img 
              src={profileData.profilePicture}
              alt={profileData.username}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <span>{profileData?.username?.charAt(0)?.toUpperCase()}</span>
            </div>
          )}
          <h1 className="profile-name">
            {profileData?.username}
          </h1>
          <p className="profile-bio">
            {profileData?.bio}
          </p>
          <button className="edit-profile-btn">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
