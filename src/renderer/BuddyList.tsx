import React, { useState } from 'react';
import BuddyListTree from './BuddyListTree';
import ChildWindow from './ChildWindow';
import ChatWindow from './ChatWindow';
import { USERS } from './data/users';
import './BuddyList.css';

const BuddyList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [openChats, setOpenChats] = useState<Array<{ buddy: any; id: string }>>([]);

  // Convert users to buddy format
  const buddies = Object.values(USERS).map(user => ({
    id: user.id,
    name: user.username || user.name,
    screenName: user.id,
    status: undefined
  }));

  const handleBuddyDoubleClick = (buddy: any) => {
    console.log('Buddy clicked:', buddy);
    // Check if chat is already open
    const existingChat = openChats.find(chat => chat.buddy.id === buddy.id);
    if (!existingChat) {
      console.log('Opening new chat window for:', buddy.name);
      setOpenChats([...openChats, { buddy, id: `chat-${buddy.id}-${Date.now()}` }]);
    } else {
      console.log('Chat already open for:', buddy.name);
    }
  };

  const handleChatClose = (chatId: string) => {
    setOpenChats(openChats.filter(chat => chat.id !== chatId));
  };

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
        <button className="aim-icon" title="Chat">💬</button>
        <button className="aim-icon" title="Get Info">ℹ️</button>
        <button className="aim-icon" title="Send File">📁</button>
      </div>

      {/* Bottom Section */}
      <div className="aim-bottom">
        <button className="aim-ad-button">Click Here Now</button>
      </div>

      {/* Render chat windows */}
      {openChats.map(({ buddy, id }) => (
        <ChildWindow
          key={id}
          title={`Chat with ${buddy.name}`}
          width={600}
          height={400}
          onClose={() => handleChatClose(id)}
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