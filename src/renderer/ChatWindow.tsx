import React, { useState, useEffect } from 'react';
import Window98 from './Window98';
import { MESSAGES } from './data/messages';
import { Message } from './data/types';
import { USERS } from './data/users';
import './ChatWindow.css';

// Import images
import buttonWarn from './images/button_warn.png';
import buttonBlock from './images/button_block.png';
import buttonAddBuddy from './images/button_add_buddy.png';
import buttonGetInfo from './images/button_get_info.png';
import buttonTalk from './images/button_talk.png';
import buttonSend from './images/button_send.png';

interface ChatWindowProps {
  buddy: {
    id: string;
    name: string;
    screenName: string;
  };
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ buddy, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ from: string; text: string; timestamp: Date }>>([]);

  // Load predefined messages when the component mounts
  useEffect(() => {
    const buddyMessages = MESSAGES.get(buddy.id as keyof typeof USERS);
    if (buddyMessages) {
      const convertedMessages = buddyMessages.map((msg: Message) => ({
        from: msg.from.screenname || msg.from.name,
        text: msg.message,
        timestamp: new Date()
      }));
      setMessages(convertedMessages);
    }
  }, [buddy.id]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        from: 'Shinypb',
        text: message,
        timestamp: new Date()
      }]);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Window98
      title={`Instant Message with ${buddy.name}`}
      onClose={onClose}
      onMinimize={() => (window.opener as Window & { electronAPI?: any })?.electronAPI?.minimizeWindow()}
      onMaximize={() => (window.opener as Window & { electronAPI?: any })?.electronAPI?.maximizeWindow()}
      width="100%"
      height="100%"
    >
      <div className="chat-window">
        <div className="chat-messages-container">
          <div className="avatar-column buddy-avatar">
            <div className="avatar-placeholder">?</div>
          </div>
          <div className="chat-messages sunken-panel">
            {messages.length === 0 ? (
              <div className="chat-empty">Start your conversation with {buddy.name}</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <span className="chat-from">{msg.from}:</span>
                  <span className="chat-text">{msg.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="chat-input-container">
          <div className="avatar-column user-avatar">
            <div className="avatar-placeholder">S</div>
          </div>
          <div className="chat-input-area">
            <textarea
              className="chat-input sunken-panel"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              rows={3}
            />
          </div>
        </div>
        
        {/* Bottom toolbar */}
        <fieldset className="chat-toolbar">
          <div>
          <button className="toolbar-btn" title="Warn">
            <img src={buttonWarn} alt="Warn" />
          </button>
          <button className="toolbar-btn" title="Block">
            <img src={buttonBlock} alt="Block" />
          </button>
          </div>
          <div>
          <button className="toolbar-btn" title="Add Buddy">
            <img src={buttonAddBuddy} alt="Add Buddy" />
          </button>
          <button className="toolbar-btn" title="Get Info">
            <img src={buttonGetInfo} alt="Get Info" />
          </button>
          <button className="toolbar-btn" title="Talk">
            <img src={buttonTalk} alt="Talk" />
          </button>
          </div>
          <div>
          <button className="toolbar-btn send-btn" onClick={handleSend} title="Send">
            <img src={buttonSend} alt="Send" />
          </button>
          </div>
        </fieldset>
      </div>
    </Window98>
  );
};

export default ChatWindow;