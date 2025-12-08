import React from 'react';

const SignupPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="signup-page">
      <h1>Signup</h1>
    </div>
  );
};

export default SignupPage;