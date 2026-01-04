import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const ScanPage = () => {
  const [activeForm, setActiveForm] = useState('web');

  return (
    <div className="right-panel">
      <div className="scan-header">
        <i className="fas fa-shield-virus"></i>
        <div>
          <h3>New Security Scan </h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            Analyze your web application for OWASP Top 10 vulnerabilities
          </p>
        </div>
      </div>

      <div className="scan-card">
        <h5><i className="fas fa-layer-group"></i> Choose Scan Type</h5>

        <div className="scan-type-options">
          <div
            className={`scan-option ${activeForm === 'web' ? 'active' : ''}`}
            onClick={() => setActiveForm('web')}
          >
            <i className="fas fa-globe"></i><br />Website URL
          </div>
          <div
            className={`scan-option ${activeForm === 'code' ? 'active' : ''}`}
            onClick={() => setActiveForm('code')}
          >
            <i className="fas fa-code"></i><br />Code Files
          </div>
          <div
            className={`scan-option ${activeForm === 'android' ? 'active' : ''}`}
            onClick={() => setActiveForm('android')}
          >
            <i className="fab fa-android"></i><br />Android App
          </div>
        </div>

        {activeForm === 'web' && (
          <div className="scan-form active">
            <input type="text" placeholder="Scan Name" />
            <input type="url" placeholder="Target URL (https://example.com)" />
            <button className="scan-btn">Start Security Scan</button>
          </div>
        )}

        {activeForm === 'code' && (
          <div className="scan-form active">
            <input type="text" placeholder="Scan Name" />
            <textarea rows="3" placeholder="Project Description"></textarea>
            <input type="file" />
            <button className="scan-btn">Start Security Scan</button>
          </div>
        )}

        {activeForm === 'android' && (
          <div className="scan-form active">
            <input type="text" placeholder="Scan Name" />
            <textarea rows="3" placeholder="App Description"></textarea>
            <input type="file" />
            <button className="scan-btn">Start Security Scan</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScanPage;