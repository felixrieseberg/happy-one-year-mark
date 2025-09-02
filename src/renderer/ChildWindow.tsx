import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { WindowContext } from './contexts/WindowContext';

interface ChildWindowProps {
  url?: string;
  title?: string;
  width?: number;
  height?: number;
  onClose?: () => void;
  children: React.ReactNode;
  index?: number;
}

const ChildWindow: React.FC<ChildWindowProps> = ({
  title = 'Chat Window',
  width = 700,
  height = 500,
  onClose,
  children,
  index = 0
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const windowRef = useRef<Window | null>(null);

  useEffect(() => {
    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.style.width = '100%';
    containerDiv.style.height = '100%';

    // Calculate position offset from parent window
    const parentLeft = window.screenX || window.screenLeft || 0;
    const parentTop = window.screenY || window.screenTop || 0;
    const parentWidth = window.outerWidth || 200;
    
    // Position new window to the right of parent with some spacing
    // Stagger windows by 30 pixels for each additional window
    const newLeft = parentLeft + parentWidth + 20 + (index * 30);
    const newTop = parentTop + (index * 30);
    
    // Open the new window with a unique name and position
    const windowFeatures = `width=${width},height=${height},left=${newLeft},top=${newTop}`;
    const windowName = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const newWindow = window.open('', windowName, windowFeatures);

    if (!newWindow) {
      console.error('Failed to open window - popup may be blocked');
      return;
    }

    windowRef.current = newWindow;
    console.log('ChildWindow: Window opened successfully');

    // Setup the new window document
    const setupWindow = () => {
      const externalDoc = newWindow.document;
      externalDoc.title = title;

      // Clear the document
      externalDoc.head.innerHTML = '';
      externalDoc.body.innerHTML = '';

      // Copy styles from parent window
      const parentStyles = Array.from(document.styleSheets);
      for (const sheet of parentStyles) {
        try {
          if (sheet.href) {
            // For external stylesheets
            const linkElem = externalDoc.createElement('link');
            linkElem.rel = 'stylesheet';
            linkElem.href = sheet.href;
            externalDoc.head.appendChild(linkElem);
          } else if (sheet.cssRules) {
            // For internal stylesheets
            const style = externalDoc.createElement('style');
            let cssText = '';
            Array.from(sheet.cssRules).forEach((rule) => {
              cssText += rule.cssText + '\n';
            });
            style.textContent = cssText;
            externalDoc.head.appendChild(style);
          }
        } catch (e) {
          console.warn('Could not copy stylesheet:', e);
        }
      }

      // Add base styles
      const baseStyle = externalDoc.createElement('style');
      baseStyle.textContent = `
        body {
          margin: 0;
          padding: 0;
          font-family: 'MS Sans Serif', sans-serif;
          overflow: hidden;
        }
      `;
      externalDoc.head.appendChild(baseStyle);

      // Append container
      externalDoc.body.appendChild(containerDiv);
      setContainer(containerDiv);
      console.log('ChildWindow: Container set and ready');
    };

    // Setup the window
    if (newWindow.document.readyState === 'complete') {
      setupWindow();
    } else {
      newWindow.addEventListener('load', setupWindow);
    }

    // Handle window close
    newWindow.addEventListener('beforeunload', () => {
      console.log('ChildWindow: Window closed by user');
      if (onClose) onClose();
    });

    // Focus the window
    newWindow.focus();

    // Cleanup
    return () => {
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, []); // Remove dependencies to prevent re-creating windows

  // Render the portal
  if (!container) {
    console.log('ChildWindow: Container not ready yet');
    return null;
  }

  console.log('ChildWindow: Rendering children to portal');
  
  // Wrap children with WindowContext to provide the correct window reference
  const wrappedChildren = (
    <WindowContext.Provider value={{ currentWindow: windowRef.current || window }}>
      {children}
    </WindowContext.Provider>
  );
  
  return ReactDOM.createPortal(wrappedChildren, container);
};

export default ChildWindow;