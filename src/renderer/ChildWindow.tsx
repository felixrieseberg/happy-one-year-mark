import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { WindowContext } from './contexts/WindowContext';

interface ChildWindowProps {
  title?: string;
  width?: number;
  height?: number;
  onClose?: () => void;
  children: React.ReactNode;
  index?: number;
  onWindowCreated?: (windowRef: Window) => void;
}

const ChildWindow: React.FC<ChildWindowProps> = ({
  title = 'Chat Window',
  width = 700,
  height = 500,
  onClose,
  children,
  index = 0,
  onWindowCreated
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
    // Use the title as the window name for identification
    const windowName = title;
    const newWindow = window.open('', windowName, windowFeatures);

    if (!newWindow) {
      return;
    }

    windowRef.current = newWindow;
    
    if (onWindowCreated) {
      onWindowCreated(newWindow);
    }

    const setupWindow = () => {
      const externalDoc = newWindow.document;
      
      externalDoc.head.innerHTML = '';
      externalDoc.body.innerHTML = '';
      
      externalDoc.title = title;

      const parentStyles = Array.from(document.styleSheets);
      for (const sheet of parentStyles) {
        try {
          if (sheet.href) {
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
          // Some stylesheets cannot be accessed due to CORS
        }
      }

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

      externalDoc.body.appendChild(containerDiv);
      setContainer(containerDiv);
      
      const electronWindow = newWindow as Window & { electronAPI?: { setWindowTitle: (title: string) => void } };
      if (electronWindow.electronAPI?.setWindowTitle) {
        electronWindow.electronAPI.setWindowTitle(title);
      }
    };

    if (newWindow.document.readyState === 'complete') {
      setupWindow();
    } else {
      newWindow.addEventListener('load', setupWindow);
    }

    newWindow.addEventListener('beforeunload', () => {
      if (onClose) onClose();
    });

    newWindow.focus();

    return () => {
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, []);

  if (!container) {
    return null;
  }

  
  const wrappedChildren = (
    <WindowContext.Provider value={{ currentWindow: windowRef.current || window }}>
      {children}
    </WindowContext.Provider>
  );
  
  return ReactDOM.createPortal(wrappedChildren, container);
};

export default ChildWindow;