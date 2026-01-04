import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const Dashboard = ({ setCurrentPage }) => {

    

  /* ===================== CHART DATA ===================== */

  const severityData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        data: [10, 5, 3, 2],
        backgroundColor: [
          "#00f2fe",
          "#00bfff",
          "#ff9800",
          "#ff3f3f",
        ],
      },
    ],
  };

  const owaspData = {
    labels: ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10"],
    datasets: [
      {
        data: [5, 2, 3, 1, 4, 2, 3, 1, 0, 2],
        backgroundColor: "#00f2fe",
      },
    ],
  };

  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Vulnerabilities",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "#00f2fe",
        backgroundColor: "rgba(0,242,254,0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  /* ===================== UI ===================== */

  return (
    <div className="right-panel">

      {/* ===== TOP CARD ===== */}
      <div className="right-top-card">
        <h2 style={{ color: "#00f2fe" }}>Vulnerability Scanner</h2>
                <div className="options">
          <div
              className="option-card"
              onClick={() => setCurrentPage('scan')}>
              <i className="fas fa-plus-circle"></i><br />
             <h1> New Security Scan fixed</h1>
          </div>

          <div
              className="option-card"
              onClick={() => setCurrentPage('reports')}>
              <i className="fas fa-file-alt"></i><br />
              View Report
              </div>

        </div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="right-stats">
        <div className="stat-card">
          Total Scans<br /><b>0</b>
        </div>
        <div className="stat-card">
          Vulnerabilities<br /><b>0</b>
        </div>
        <div className="stat-card">
          Security Score<br /><b>0%</b>
        </div>
        <div className="stat-card">
          Avg Scan Time<br /><b>0s</b>
        </div>
      </div>

      {/* ===== CHARTS (YOUR ORIGINAL CODE) ===== */}
      <div className="chart-grid">
        <div className="chart-card">
          <h5>Vulnerability Severity Distribution</h5>
          <Doughnut data={severityData} options={options} />
        </div>

        <div className="chart-card">
          <h5>OWASP Top 10 Distribution</h5>
          <Bar data={owaspData} options={options} />
        </div>

        <div className="chart-card">
          <h5>Vulnerability Detection Trend</h5>
          <Line data={trendData} options={options} />
        </div>
      </div>

      {/* ===== ACTIVITY SECTION ===== */}
      <div className="activity-grid">
        <div className="activity-card">
          <div className="activity-header">
            <h5>Recent Security Scans</h5>
            <a href="#">View All</a>
          </div>
          <div className="activity-item">
            Web Application Scan <span className="badge bg-success">Completed</span>
          </div>
          <div className="activity-item">
            API Scan <span className="badge bg-success">Completed</span>
          </div>
          <div className="activity-item">
            Network Scan <span className="badge bg-primary">Running</span>
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-header">
            <h5>
              <i className="fas fa-skull-crossbones" style={{ color: "#ff3f3f" }}></i>{" "}
              Critical Threats
            </h5>
          </div>
          <div className="activity-item">
            SQL Injection <span className="badge bg-danger">Critical</span>
          </div>
          <div className="activity-item">
            Authentication Bypass <span className="badge bg-danger">Critical</span>
          </div>
          <div className="activity-item">
            XSS Vulnerability <span className="badge bg-warning text-dark">High</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

