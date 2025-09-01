import React, { useState } from 'react';
import BuddyListTree from './BuddyListTree';
import { USERS } from '../data/users';
import './BuddyList.css';

const BuddyList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('online');

  // Convert users to buddy format
  const buddies = Object.values(USERS).map(user => ({
    id: user.id,
    name: user.username || user.name,
    screenName: user.id,
    status: undefined
  }));

  return (
    <div className="aim-buddy-list">
      {/* Top Image Section */}
      <div className="aim-header">
        <div className="aim-logo">AIM</div>
        <div className="aim-user-info">
          <span className="aim-welcome">My AIM</span>
          <span className="aim-people">People</span>
          <span className="aim-help">Help</span>
        </div>
      </div>

      {/* Tab Control */}
      <menu role="tablist">
        <li role="tab" aria-selected={activeTab === 'online'}>
          <a href="#online" onClick={(e) => { e.preventDefault(); setActiveTab('online'); }}>
            Online
          </a>
        </li>
        <li role="tab" aria-selected={activeTab === 'setup'}>
          <a href="#setup" onClick={(e) => { e.preventDefault(); setActiveTab('setup'); }}>
            List Setup
          </a>
        </li>
      </menu>
      
      <div className="window" role="tabpanel" style={{ flex: 1 }}>
        <div className="window-body">
          {activeTab === 'online' ? (
            <div className="sunken-panel" style={{ height: '100%', margin: '8px' }}>
              <BuddyListTree
                groups={[
                  {
                    id: 'buddies',
                    name: 'Buddies',
                    buddies: buddies
                  },
                  {
                    id: 'family',
                    name: 'Family',
                    buddies: []
                  },
                  {
                    id: 'coworkers',
                    name: 'Co-Workers',
                    buddies: []
                  },
                  {
                    id: 'offline',
                    name: 'Offline',
                    buddies: []
                  }
                ]}
                onBuddyDoubleClick={(buddy) => {
                  console.log('Double clicked buddy:', buddy);
                  // This is where you would open a chat window
                }}
              />
            </div>
          ) : (
            <div>
              List Setup options...
            </div>
          )}
        </div>
      </div>

      {/* Icon Row */}
      <div className="aim-icon-row">
        <button className="aim-icon" title="Chat">💬</button>
        <button className="aim-icon" title="Get Info">ℹ️</button>
        <button className="aim-icon" title="Send File">📁</button>
      </div>

      {/* Bottom Section */}
      <div className="aim-bottom">
        <button className="aim-ad-button">Click Here Now</button>
      </div>
    </div>
  );
};

export default BuddyList;