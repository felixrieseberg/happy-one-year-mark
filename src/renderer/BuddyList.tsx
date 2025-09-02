import React, { useState } from 'react';
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
  const allUsers = Object.values(USERS);
  // Separate Claude for Family group
  const claude = allUsers.find(user => user.id === 'claude');
  const buddies = allUsers.filter(user => user.id !== 'claude');
  
  // Get buddies who have messages (unread)
  const unreadBuddies = buddies.filter(buddy => 
    MESSAGES.has(buddy.id as keyof typeof USERS) && !readBuddies.has(buddy.id)
  );

  const handleBuddyDoubleClick = (buddy: User) => {
    
    // Check if a chat is already open for this buddy
    const existingChatIndex = openChats.findIndex(chat => chat.buddy.id === buddy.id);
    if (existingChatIndex !== -1) {
      const existingChat = openChats[existingChatIndex];
      
      const windowTitle = getChatWindowTitle(buddy);
      window.electronAPI?.focusWindow(windowTitle);
      
      setReadBuddies(prev => new Set([...prev, buddy.id]));
      return;
    }
    
    const chatId = `chat-${buddy.id}-${Date.now()}`;
    setOpenChats([...openChats, { buddy, id: chatId, windowRef: null }]);
    
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
                    buddies: claude ? [claude] : []
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
            <div style={{ padding: '8px' }}>
              <fieldset>
                <legend>Buddy List Options</legend>
                <div style={{ marginBottom: '8px' }}>
                  <label>
                    <input type="checkbox" defaultChecked />
                    Show idle time for buddies
                  </label>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label>
                    <input type="checkbox" defaultChecked />
                    Play sounds when buddies sign on/off
                  </label>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label>
                    <input type="checkbox" />
                    Sort buddies alphabetically
                  </label>
                </div>
              </fieldset>
              
              <fieldset style={{ marginTop: '16px' }}>
                <legend>Privacy Settings</legend>
                <div style={{ marginBottom: '8px' }}>
                  <label>
                    <input type="checkbox" />
                    Allow only buddies to see me online
                  </label>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label>
                    <input type="checkbox" />
                    Block messages from non-buddies
                  </label>
                </div>
              </fieldset>
              
              <fieldset style={{ marginTop: '16px' }}>
                <legend>Away Message</legend>
                <textarea 
                  className="sunken-panel" 
                  style={{ width: '100%', height: '60px', resize: 'none' }}
                  placeholder="I am away from my computer right now."
                  defaultValue="I am away from my computer right now."
                />
                <div style={{ marginTop: '8px' }}>
                  <button>Save Away Message</button>
                </div>
              </fieldset>
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

      {/* News Ticker */}
      <div className="news-ticker">
        <div className="news-ticker-content">
          🎮 Nintendo Wii causes nationwide TV damage epidemic from thrown controllers • 
          💿 Blockbuster CEO confident Netflix is "just a fad" • 
          🎵 iTunes Store reaches 3 billion downloads, your computer has 47 toolbars • 
          📱 BlackBerry declared "peak of mobile technology" by tech experts • 
          🎬 Spider-Man 3 breaks box office records, emo Peter Parker dance scene confuses millions • 
          💻 Windows Vista finally makes computers secure, users report • 
          📺 Lost writers confirm they "definitely have a plan" for the show's mysteries • 
          🎮 Everyone's grandma now owns a Wii for bowling • 
          📱 T9 texting speed champion types "Hello" in under 3 seconds • 
          🌐 Facebook opens to everyone, your parents request to be your friend • 
          💾 1GB USB drives now "massive" at only $40 • 
          🎵 Soulja Boy teaches entire internet how to "Crank That" • 
          📱 Motorola RAZR still coolest phone despite being 3 years old • 
          🎮 Portal's cake confirmed to be a lie by anonymous sources • 
        </div>
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