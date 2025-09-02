import React from 'react';
import Window98 from './Window98';
import BuddyList from './BuddyList';
import './App.css';
import "98.css";

const App: React.FC = () => {
  const handleClose = () => {
    window.electronAPI.closeWindow();
  };

  const handleMinimize = () => {
    window.electronAPI.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI.maximizeWindow();
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden'
    }}>
      <Window98
        title="Buddy List"
        onClose={handleClose}
        onMinimize={handleMinimize}
        showMaximize={false}
        width="100%"
        height="100%"
      >
        <BuddyList />
      </Window98>
    </div>
  );
};

export default App;