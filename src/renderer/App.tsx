import React from 'react';
import { Window, Button } from 'react-windows-xp';
import './App.css';

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
      <Window
        title="Happy One Year Mark! 🎉"
        showClose={true}
        showMinimize={true}
        showMaximize={true}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        style={{
          width: '100%',
          height: 'calc(100% - 3px)',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <div style={{ 
          padding: '20px',
          backgroundColor: '#ECE9D8',
          height: '100%',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ marginTop: 0 }}>Welcome to Windows XP!</h1>
          <p>This Electron app now looks like a classic Windows XP window.</p>
          <p>Happy one year, Mark! 🎉</p>
          
          <div style={{ marginTop: '20px' }}>
            <Button>Click me!</Button>
          </div>
        </div>
      </Window>
    </div>
  );
};

export default App;