import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password length
    if (!formData.email || formData.email.length === 0) {
      setError('Email cannot be empty.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setError(null); // Reset any previous errors

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, username: formData.username, password: formData.password };

      // Make an API request
      const response = await axios.post(endpoint, payload);
      // After successful login/signup, redirect to the home page
      navigate('/');
      // Handle success (you can redirect or show a message)
      console.log('Success:', response.data);
    } catch (err) {
      // Handle error
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
