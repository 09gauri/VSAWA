import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="right-panel">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <i className="fas fa-shield-halved" style={{ fontSize: '48px', color: '#00f2fe' }}></i>
            <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
            <p style={{ color: '#94a3b8' }}>
              {isSignup ? 'Sign up to get started' : 'Sign in to continue'}
            </p>
          </div>

          <div className="login-form">
            {isSignup && (
              <input type="text" placeholder="Full Name" />
            )}
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            {isSignup && (
              <input type="password" placeholder="Confirm Password" />
            )}
            <button className="scan-btn">{isSignup ? 'Sign Up' : 'Sign In'}</button>
          </div>

          <div className="login-footer">
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <span
                onClick={() => setIsSignup(!isSignup)}
                style={{ color: '#00f2fe', cursor: 'pointer', marginLeft: '5px' }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;