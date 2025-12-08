import React from 'react';

const LoginPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
    </div>
  );
};

export default LoginPage;