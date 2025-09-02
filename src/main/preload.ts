import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  focusWindow: (windowName: string) => ipcRenderer.send('focus-window', windowName),
  setWindowTitle: (title: string) => ipcRenderer.send('set-window-title', title),
  minimizeWindowByTitle: (title: string) => ipcRenderer.send('minimize-window-by-title', title),
  closeWindowByTitle: (title: string) => ipcRenderer.send('close-window-by-title', title),
  getWindowTitle: () => window.document.title,
  storeApiKey: (apiKey: string) => ipcRenderer.invoke('store-api-key', apiKey),
  getApiKey: () => ipcRenderer.invoke('get-api-key'),
  clearApiKey: () => ipcRenderer.invoke('clear-api-key'),
  sendClaudeMessage: (message: string, conversationHistory: any[]) => ipcRenderer.invoke('send-claude-message', message, conversationHistory)
});