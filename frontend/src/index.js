import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EMRApp from './EMR_Frontend_Assignment';
import RootLayout from './layout';
// import AppointmentManagementView from './main'

const App = () => {
  const [currentView, setCurrentView] = useState('appointments');

  return (
    <RootLayout activeView={currentView} onViewChange={setCurrentView}>
      <EMRApp currentView={currentView} />
    </RootLayout>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
