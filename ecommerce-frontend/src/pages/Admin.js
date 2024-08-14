import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [token, setToken] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: 'admin',
        password: 'password'
      });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const generateDiscountCode = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/discount/generate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`New discount code generated: ${response.data.code}`);
    } catch (error) {
      console.error('Error generating discount code:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {stats && (
        <div className="mb-4">
          <p>Total Orders: {stats.totalOrders}</p>
          <p>Total Purchase Amount: ${stats.totalPurchaseAmount}</p>
          <p>Total Discount Amount: ${stats.totalDiscountAmount}</p>
          <p>Discount Codes: {stats.discountCodes.join(', ')}</p>
        </div>
      )}
      <button
        onClick={generateDiscountCode}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Discount Code
      </button>
    </div>
  );
};

export default Admin;