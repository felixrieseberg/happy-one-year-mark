import React, { useState } from 'react';
import './BuddyListTree.css';
import { User } from './data/types';

interface BuddyGroup {
  id: string;
  name: string;
  buddies: User[];
}

interface BuddyListTreeProps {
  groups: BuddyGroup[];
  onBuddyDoubleClick?: (buddy: User) => void;
}

const BuddyListTree: React.FC<BuddyListTreeProps> = ({ groups, onBuddyDoubleClick }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.map(g => g.id)) // All groups expanded by default
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleBuddyClick = (buddy: User) => {
    if (onBuddyDoubleClick) {
      onBuddyDoubleClick(buddy);
    }
  };

  return (
    <div className="buddy-list-tree">
      <div className="buddy-groups">
        {groups.map((group) => (
          <div key={group.id} className="buddy-group">
            <div 
              className="buddy-group-header"
              onClick={() => toggleGroup(group.id)}
            >
              <span className={`arrow ${expandedGroups.has(group.id) ? 'expanded' : ''}`}>
                ▶
              </span>
              <span className="group-name">{group.name} ({group.buddies.length})</span>
            </div>
            {expandedGroups.has(group.id) && (
              <div className="buddy-group-content">
                {group.buddies.map((buddy) => (
                  <div
                    key={buddy.id}
                    className="buddy-item"
                    onClick={() => handleBuddyClick(buddy)}
                  >
                    <span className="buddy-name">{buddy.screenname || buddy.id || buddy.name}</span>
                  </div>
                ))}
                {group.buddies.length === 0 && (
                  <div className="buddy-item empty">
                    <em>No buddies in this group</em>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {groups.length === 0 && (
          <div className="no-buddies">
            <em style={{ color: '#666' }}>No buddies online</em>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyListTree;