interface ElectronAPI {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  focusWindow: (windowName: string) => void;
  setWindowTitle: (title: string) => void;
  minimizeWindowByTitle: (title: string) => void;
  closeWindowByTitle: (title: string) => void;
  getWindowTitle: () => string;
  storeApiKey: (apiKey: string) => Promise<void>;
  getApiKey: () => Promise<string | null>;
  clearApiKey: () => Promise<boolean>;
  sendClaudeMessage: (message: string, conversationHistory: Array<{role: string; content: string}>) => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};