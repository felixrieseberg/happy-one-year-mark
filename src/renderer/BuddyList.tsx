import React, { useState } from 'react';
import BuddyListTree from './BuddyListTree';
import ChildWindow from './ChildWindow';
import ChatWindow from './ChatWindow';
import { USERS } from './data/users';
import { User } from './data/types';
import './BuddyList.css';

// Import images
import blButtonAway from './images/bl_button_away.png';
import blButtonGetInfo from './images/bl_button_get_info.png';
import blButtonGroup from './images/bl_button_group.png';
import aimHeader from './images/aim_header.png';

const BuddyList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [openChats, setOpenChats] = useState<Array<{ buddy: User; id: string }>>([]);
  const buddies = Object.values(USERS);

  const handleBuddyDoubleClick = (buddy: User) => {
    console.log('Buddy clicked:', buddy);
    // Always open a new chat window
    console.log('Opening new chat window for:', buddy.name);
    setOpenChats([...openChats, { buddy, id: `chat-${buddy.id}-${Date.now()}` }]);
  };

  const handleChatClose = (chatId: string) => {
    setOpenChats(openChats.filter(chat => chat.id !== chatId));
  };

  return (
    <div className="aim-buddy-list">
      {/* Top Image Section */}
      <div className="aim-header">
        <img src={aimHeader} alt="AOL Instant Messenger" />
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
                onBuddyDoubleClick={handleBuddyDoubleClick}
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
        <button className="aim-icon" title="Away">
          <img src={blButtonAway} alt="Away" />
        </button>
        <button className="aim-icon" title="Get Info">
          <img src={blButtonGetInfo} alt="Get Info" />
        </button>
        <button className="aim-icon" title="Group">
          <img src={blButtonGroup} alt="Group" />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="aim-bottom">
        <button className="aim-ad-button">Click Here Now</button>
      </div>

      {/* Render chat windows */}
      {openChats.map(({ buddy, id }, index) => (
        <ChildWindow
          key={id}
          title={`Chat with ${buddy.name}`}
          width={600}
          height={400}
          onClose={() => handleChatClose(id)}
          index={index}
        >
          <ChatWindow
            buddy={buddy}
            onClose={() => handleChatClose(id)}
          />
        </ChildWindow>
      ))}
    </div>
  );
};

export default BuddyList;