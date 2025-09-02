import React, { useEffect } from 'react';
import Window98 from './Window98';
import BuddyList from './BuddyList';
import './App.css';
import "98.css";

// Import audio files
import welcomeAudio from './audio/Welcome.mp3';
import buddyInAudio from './audio/BuddyIn.mp3';
import imAudio from './audio/IM.mp3';

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
  
  // Play welcome sounds when the app starts
  useEffect(() => {
    const playAudioSequence = async () => {
      // Play Welcome.mp3
      const welcome = new Audio(welcomeAudio);
      welcome.play();
      await new Promise(resolve => welcome.addEventListener('ended', resolve, { once: true }));
      
      // Play BuddyIn.mp3
      const buddyIn = new Audio(buddyInAudio);
      buddyIn.play();
      await new Promise(resolve => buddyIn.addEventListener('ended', resolve, { once: true }));
      
      // Play IM.mp3 twice
      const im1 = new Audio(imAudio);
      im1.play();
      await new Promise(resolve => im1.addEventListener('ended', resolve, { once: true }));
      
      const im2 = new Audio(imAudio);
      im2.play();
    };
    
    playAudioSequence().catch(err => {
      console.error('Error playing audio sequence:', err);
    });
  }, []); // Empty dependency array means this runs once on mount

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