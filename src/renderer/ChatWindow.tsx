import React, { useState, useEffect } from 'react';
import Window98 from './Window98';
import { MESSAGES } from './data/messages';
import { Message, User } from './data/types';
import { USERS } from './data/users';
import { hasApiKey, storeApiKey, sendMessageToClaude } from './services/anthropicService';
import './ChatWindow.css';

// Import images
import buttonWarn from './images/button_warn.png';
import buttonBlock from './images/button_block.png';
import buttonAddBuddy from './images/button_add_buddy.png';
import buttonGetInfo from './images/button_get_info.png';
import buttonTalk from './images/button_talk.png';
import buttonSend from './images/button_send.png';
import buttonSendActive from './images/btn_send_active.png';
import userAvatar from './data/avatars/shinypb.png';

interface ChatWindowProps {
  buddy: User;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ buddy, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ from: string; text: string; timestamp: Date; attachments?: string[] }>>([]);
  const [isClaudeChat, setIsClaudeChat] = useState(false);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const windowTitle = `Instant Message with ${buddy.screenname || buddy.id || buddy.name}${buddy.name !== (buddy.screenname || buddy.id) ? ` (${buddy.name})` : ''}`;

  useEffect(() => {
    const checkClaude = async () => {
      if (buddy.id === 'claude') {
        setIsClaudeChat(true);
        const hasKey = await hasApiKey();
        setNeedsApiKey(!hasKey);
      } else {
        setIsClaudeChat(false);
        setNeedsApiKey(false);
      }
    };
    checkClaude();
  }, [buddy.id]);

  useEffect(() => {
    if (!isClaudeChat) {
      const buddyMessages = MESSAGES.get(buddy.id as keyof typeof USERS);
      if (buddyMessages) {
        const convertedMessages = buddyMessages.map((msg: Message) => ({
          from: msg.from.screenname || msg.from.name,
          text: msg.message,
          timestamp: new Date(),
          attachments: msg.attachments
        }));
        setMessages(convertedMessages);
      }
    }
  }, [buddy.id, isClaudeChat]);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = {
        from: 'Shinypb',
        text: message,
        timestamp: new Date()
      };
      setMessages([...messages, userMessage]);
      setMessage('');

      if (isClaudeChat) {
        setIsLoading(true);
        setError(null);
        
        try {
          const conversationHistory = messages.map(msg => ({
            role: (msg.from === 'Shinypb' ? 'user' : 'assistant') as 'user' | 'assistant',
            content: msg.text
          }));
          
          const claudeResponse = await sendMessageToClaude(message, conversationHistory);
          
          setMessages(prev => [...prev, {
            from: buddy.screenname || buddy.name,
            text: claudeResponse,
            timestamp: new Date()
          }]);
        } catch (err: any) {
          setError(err.message);
          
          setMessages(prev => [...prev, {
            from: buddy.screenname || buddy.name,
            text: `Error: ${err.message || 'Failed to send message'}`,
            timestamp: new Date()
          }]);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleApiKeySubmit = async () => {
    if (apiKeyInput.trim()) {
      setIsLoading(true);
      setError(null);
      
      try {
        await storeApiKey(apiKeyInput);
        setNeedsApiKey(false);
        setApiKeyInput('');
      } catch (err: any) {
        setError('Failed to store API key');
      } finally {
        setIsLoading(false);
      }
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
      title={windowTitle}
      onClose={() => {
        if (window.electronAPI) {
          window.electronAPI.closeWindowByTitle(windowTitle);
        }
        onClose();
      }}
      onMinimize={() => {
        if (window.electronAPI) {
          window.electronAPI.minimizeWindowByTitle(windowTitle);
        }
      }}
      showMaximize={false}
      width="100%"
      height="100%"
    >
      <div className="chat-window">
        {needsApiKey ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Enter Anthropic API Key</h3>
            <p>To chat with Claude, please provide your Anthropic API key.</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Get your API key from <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer">console.anthropic.com</a>
            </p>
            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
            <div style={{ marginTop: '20px' }}>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApiKeySubmit();
                  }
                }}
                placeholder="sk-ant-..."
                style={{ width: '300px', marginRight: '10px' }}
                disabled={isLoading}
              />
              <button onClick={handleApiKeySubmit} disabled={isLoading || !apiKeyInput.trim()}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="chat-messages-container">
              <div className="avatar-column buddy-avatar">
                {buddy.avatar ? (
                  <img src={buddy.avatar} alt={buddy.name} className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    {isClaudeChat ? '🤖' : '?'}
                  </div>
                )}
              </div>
              <div className="chat-messages sunken-panel">
            {messages.length === 0 ? (
              <div className="chat-empty">Start your conversation with {buddy.screenname || buddy.id || buddy.name}</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <span className="chat-from">{msg.from}:</span>
                  <span className="chat-text">{msg.text}</span>
                  {msg.attachments && msg.attachments.map((attachment, i) => (
                    <div key={i} className="chat-attachment">
                      <img src={attachment} alt="Attachment" className="chat-attachment-image" />
                    </div>
                  ))}
                </div>
              ))
            )}
            {isLoading && isClaudeChat && (
              <div className="chat-message">
                <span className="chat-from">{buddy.screenname || buddy.name}:</span>
                <span className="chat-text" style={{ fontStyle: 'italic' }}>typing...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="chat-input-container">
          <div className="avatar-column user-avatar">
            <img src={userAvatar} alt="Shinypb" className="avatar-image" />
          </div>
          <div className="chat-input-area">
            <textarea
              className="chat-input sunken-panel"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              rows={3}
              disabled={isLoading}
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
          <button 
            className="toolbar-btn send-btn" 
            onClick={handleSend} 
            title="Send"
            disabled={!message.trim() || isLoading}
          >
            <img src={message.trim() ? buttonSendActive : buttonSend} alt="Send" />
          </button>
          </div>
        </fieldset>
        </>
        )}
      </div>
    </Window98>
  );
};

export default ChatWindow;