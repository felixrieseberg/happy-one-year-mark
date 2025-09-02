import React, { useState, useRef } from 'react';
import BuddyListTree from './BuddyListTree';
import ChildWindow from './ChildWindow';
import ChatWindow from './ChatWindow';
import { USERS } from './data/users';
import { User } from './data/types';
import { MESSAGES } from './data/messages';
import './BuddyList.css';

// Import images
import blButtonAway from './images/bl_button_away.png';
import blButtonGetInfo from './images/bl_button_get_info.png';
import blButtonGroup from './images/bl_button_group.png';
import aimHeader from './images/aim_header.png';
import aolAd from './images/aol_ad.png';

const BuddyList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [openChats, setOpenChats] = useState<Array<{ buddy: User; id: string; windowRef: Window | null }>>([]);
  const [readBuddies, setReadBuddies] = useState<Set<string>>(new Set());
  const buddies = Object.values(USERS);
  
  // Get buddies who have messages (unread)
  const unreadBuddies = buddies.filter(buddy => 
    MESSAGES.has(buddy.id as keyof typeof USERS) && !readBuddies.has(buddy.id)
  );

  const handleBuddyDoubleClick = (buddy: User) => {
    console.log('Buddy clicked:', buddy);
    
    // Check if a chat is already open for this buddy
    const existingChatIndex = openChats.findIndex(chat => chat.buddy.id === buddy.id);
    if (existingChatIndex !== -1) {
      const existingChat = openChats[existingChatIndex];
      console.log('Chat already open for:', buddy.name);
      
      // Use IPC to focus the window
      const windowTitle = getChatWindowTitle(buddy);
      (window as any).electronAPI?.focusWindow(windowTitle);
      
      // Mark buddy as read
      setReadBuddies(prev => new Set([...prev, buddy.id]));
      return;
    }
    
    // Open new chat window
    console.log('Opening new chat window for:', buddy.name);
    const chatId = `chat-${buddy.id}-${Date.now()}`;
    setOpenChats([...openChats, { buddy, id: chatId, windowRef: null }]);
    
    // Mark buddy as read
    setReadBuddies(prev => new Set([...prev, buddy.id]));
  };
  
  const handleWindowCreated = (chatId: string, windowRef: Window) => {
    setOpenChats(chats => 
      chats.map(chat => 
        chat.id === chatId ? { ...chat, windowRef } : chat
      )
    );
  };

  const handleChatClose = (chatId: string) => {
    setOpenChats(openChats.filter(chat => chat.id !== chatId));
  };
  
  const getChatWindowTitle = (buddy: User) => {
    return `Instant Message with ${buddy.screenname || buddy.id || buddy.name}${buddy.name !== (buddy.screenname || buddy.id) ? ` (${buddy.name})` : ''}`;
  };

  return (
    <div className="aim-buddy-list">
      {/* Top Image Section */}
      <div className="aim-header">
        <img src={aimHeader} alt="Mark Instant Messenger" />
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
                    id: 'family',
                    name: 'Family',
                    buddies: []
                  },
                  {
                    id: 'buddies',
                    name: 'Buddies',
                    buddies: buddies
                  }
                ]}
                onBuddyDoubleClick={handleBuddyDoubleClick}
                unreadBuddyIds={new Set(unreadBuddies.map(b => b.id))}
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
        <img 
          src={aolAd} 
          alt="You've Got Help - 250 hours FREE!" 
          className="aim-ad"
          onClick={() => window.open('https://aol.com', '_blank')}
        />
      </div>

      {/* Render chat windows */}
      {openChats.map(({ buddy, id }, index) => (
        <ChildWindow
          key={id}
          title={getChatWindowTitle(buddy)}
          width={600}
          height={400}
          onClose={() => handleChatClose(id)}
          index={index}
          onWindowCreated={(windowRef) => handleWindowCreated(id, windowRef)}
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