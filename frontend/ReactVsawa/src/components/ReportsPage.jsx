import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const ReportsPage = () => {
  const reports = [
    {
      title: 'Website Security Scan',
      subtitle: 'https://example.com',
      type: 'web',
      typeName: 'Web Scan',
      date: '02 Jan 2026',
      severity: { low: 2, high: 1 }
    },
    {
      title: 'Android App Scan',
      subtitle: 'com.example.app',
      type: 'android',
      typeName: 'Android',
      date: '01 Jan 2026',
      severity: { medium: 3, critical: 1 }
    }
  ];

  return (
    <div className="right-panel">
      <div className="page-header">
        <div className="breadcrumb">
          <span>Dashboard</span><span>Reports</span>
        </div>
        <h2>Security Reports</h2>
      </div>

      <div className="metrics-header">
        <div className="metric-box">Total Reports: 2</div>
        <div className="metric-box">Completed Scans: 2</div>
        <div className="metric-box">Critical Issues: 1</div>
      </div>

      <div className="report-list">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <div>
              <div className="report-title">{report.title}</div>
              <div className="report-sub">{report.subtitle}</div>
            </div>

            <div className={`badge-type ${report.type}`}>{report.typeName}</div>

            <div>
              <div className="report-sub">Date</div>
              <div>{report.date}</div>
            </div>

            <div className="status">Completed</div>

            <div className="severity">
              {Object.entries(report.severity).map(([key, value]) => (
                <span key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
              ))}
            </div>

            <div className="report-actions">
              <button className="btn-report view">View</button>
              <button className="btn-report download">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReportsPage;