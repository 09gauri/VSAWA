import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import ScanPage from './components/ScanPage.jsx';
import ReportsPage from './components/ReportsPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard setCurrentPage={setCurrentPage} />;
    case 'scan':
      return <ScanPage />;
    case 'reports':
      return <ReportsPage />;
    case 'login':
      return <LoginPage />;
      
    case 'settings':
    case 'database':
      return <NotFoundPage />;

    default:
    return <NotFoundPage />;
    }
};


  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <style>{`
        body { margin: 0; font-family: 'Poppins', sans-serif; background: #0b0f1a; color: white; }
        .d-flex { min-height: 100vh; display: flex; }
        
        .sidebar { width: 240px; background: #000; display: flex; flex-direction: column; border-right: 1px solid #1f2933; }
        .sidebar-header { padding: 15px; font-size: 18px; font-weight: 600; color: #00f2fe; display: flex; gap: 8px; align-items: center; border-bottom: 1px solid #1f2933; }
        .menu-item { padding: 10px 15px; display: flex; gap: 10px; cursor: pointer; color: #cbd5e1; transition: .3s; }
        .menu-item:hover { background: #111827; color: #00f2fe; }
        .menu-item.active { background: linear-gradient(135deg, #00f2fe, #4facfe); color: black; }
        
        .metrics-section { border-top: 1px solid #1f2933; margin-top: auto; }
        .metric-box { background: #111; margin: 8px; padding: 8px; border-radius: 8px; text-align: center; font-size: 13px; }
        
        .right-panel { flex: 1; padding: 15px; display: flex; flex-direction: column; gap: 20px; }
        
        .right-top-card { background: #111; padding: 20px; border-radius: 12px; }
        .options { display: flex; gap: 15px; flex-wrap: wrap; }
        .option-card { flex: 1; min-width: 200px; background: #1b1f2a; padding: 15px; border-radius: 10px; text-align: center; cursor: pointer; transition: .3s; }
        .option-card:hover { background: linear-gradient(135deg, #00f2fe, #4facfe); color: black; transform: translateY(-4px); }
        
        .right-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .stat-card { background: #111; padding: 18px; border-radius: 12px; text-align: center; }
        
        .chart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .chart-card { background: #111; padding: 18px; border-radius: 12px; transition: .3s; border: 1px solid transparent; }
        .chart-card:hover { border: 1px solid #00f2fe; box-shadow: 0 0 20px rgba(0, 242, 254, .4); }
        .chart-container { height: 260px; }
        
        .activity-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .activity-card { background: #111; padding: 18px; border-radius: 12px; border: 1px solid transparent; transition: .3s; }
        .activity-card:hover { border: 1px solid #00f2fe; box-shadow: 0 0 20px rgba(0, 242, 254, .35); }
        .activity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .activity-header a { font-size: 13px; color: #00f2fe; text-decoration: none; }
        .activity-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1f2933; font-size: 14px; }
        .badge { font-size: 12px; padding: 4px 8px; border-radius: 6px; }
        
        .scan-header { background: #111; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; }
        .scan-header i { font-size: 32px; color: #00f2fe; }
        
        .scan-card { background: #111; padding: 20px; border-radius: 12px; }
        .scan-type-options { display: flex; gap: 15px; margin-top: 15px; flex-wrap: wrap; }
        .scan-option { flex: 1; min-width: 200px; background: #1b1f2a; padding: 15px; border-radius: 10px; text-align: center; cursor: pointer; transition: .3s; }
        .scan-option:hover, .scan-option.active { background: linear-gradient(135deg, #00f2fe, #4facfe); color: black; transform: translateY(-4px); }
        
        .scan-form { margin-top: 20px; display: flex; flex-direction: column; gap: 15px; }
        .scan-form input, .scan-form textarea { background: #0b0f1a; border: 1px solid #1f2933; color: white; padding: 10px; border-radius: 8px; }
        .scan-form input:focus, .scan-form textarea:focus { outline: none; border-color: #00f2fe; }
        .scan-btn { background: linear-gradient(135deg, #00f2fe, #4facfe); border: none; padding: 12px; font-weight: 600; border-radius: 10px; cursor: pointer; color: black; }
        
        .page-header { background: #111; padding: 20px 25px; border-radius: 12px; box-shadow: 0 0 15px rgba(0, 242, 254, .2); display: flex; flex-direction: column; gap: 10px; }
        .page-header h2 { color: #00f2fe; margin: 0; font-size: 28px; font-weight: 700; }
        .breadcrumb { font-size: 13px; color: #9ca3af; }
        .breadcrumb span + span::before { content: " / "; }
        
        .metrics-header { display: flex; gap: 15px; flex-wrap: wrap; }
        .metrics-header .metric-box { flex: 1; }
        
        .report-list { display: flex; flex-direction: column; gap: 20px; }
        .report-card { background: #111; padding: 20px; border-radius: 12px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto; gap: 15px; align-items: center; transition: .3s; border: 1px solid transparent; }
        .report-card:hover { border: 1px solid #00f2fe; box-shadow: 0 0 18px rgba(0, 242, 254, .4); }
        
        .report-title { font-weight: 600; color: #00f2fe; font-size: 16px; }
        .report-sub { font-size: 13px; color: #9ca3af; margin-top: 4px; }
        
        .badge-type { padding: 6px 12px; border-radius: 20px; font-size: 12px; text-align: center; color: white; font-weight: 500; }
        .web { background: #1e3a8a; }
        .code { background: #065f46; }
        .android { background: #7c2d12; }
        
        .status { font-size: 13px; color: #22c55e; font-weight: 500; }
        .severity { font-size: 13px; }
        .severity span { margin-right: 8px; }
        
        .report-actions { display: flex; gap: 10px; }
        .btn-report { padding: 6px 12px; border-radius: 6px; font-size: 13px; cursor: pointer; border: none; transition: .3s; font-weight: 500; }
        .view { background: #00f2fe; color: black; }
        .download { background: #1f2933; color: white; }
        .btn-report:hover { opacity: .8; }
        
        .login-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
        .login-card { background: #111; padding: 40px; border-radius: 16px; width: 100%; max-width: 450px; box-shadow: 0 0 30px rgba(0, 242, 254, .3); }
        .login-header { text-align: center; margin-bottom: 30px; }
        .login-form { display: flex; flex-direction: column; gap: 15px; }
        .login-footer { margin-top: 20px; text-align: center; }
        
        @media(max-width: 992px) {
          .report-card { grid-template-columns: 1fr; text-align: left; }
          .report-actions { justify-content: flex-start; margin-top: 10px; }
        }
        @media(max-width: 768px) {
          .sidebar { display: none; }
        }
      `}</style>

      <div className="d-flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {renderPage()}
      </div>
    </>
  );
};

export default App;