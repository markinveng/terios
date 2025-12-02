import React from 'react';

const Profile: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Profile Page</h1>
      <p>Welcome to your profile page!</p>
      <div>
        <h2>User Information</h2>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
      </div>
    </div>
  );
};

export default Profile;