import React from 'react';

interface Window98Props {
  title: string;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Window98: React.FC<Window98Props> = ({
  title,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  onMinimize,
  onMaximize,
  onClose,
  children,
  width = '100%',
  height = '100%'
}) => {
  return (
    <div className="window" style={{ width, height }}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {showMinimize && (
            <button aria-label="Minimize" onClick={onMinimize}></button>
          )}
          {showMaximize && (
            <button aria-label="Maximize" onClick={onMaximize}></button>
          )}
          {showClose && (
            <button aria-label="Close" onClick={onClose}></button>
          )}
        </div>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  );
};

export default Window98;