import React from 'react';
import Window98 from './Window98';
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
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#008080'
    }}>
      <Window98
        title="Happy One Year Mark! 🎉"
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        width="100%"
        height="calc(100% - 4px)"
      >
        <div style={{ padding: '16px' }}>
          <h2>Welcome to Windows 98!</h2>
          <p>This Electron app now has that classic Windows 98 look.</p>
          <p>Happy one year, Mark! 🎉</p>
          
          <div style={{ marginTop: '20px' }}>
            <button>Click me!</button>
            <button style={{ marginLeft: '8px' }}>Another button</button>
          </div>
          
          <div className="field-row" style={{ marginTop: '20px' }}>
            <label htmlFor="text-input">Name:</label>
            <input id="text-input" type="text" />
          </div>
        </div>
      </Window98>
    </div>
  );
};

export default App;