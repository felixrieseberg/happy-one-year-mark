// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// Expose window control methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  focusWindow: (windowName: string) => ipcRenderer.send('focus-window', windowName),
  setWindowTitle: (title: string) => ipcRenderer.send('set-window-title', title),
  minimizeWindowByTitle: (title: string) => ipcRenderer.send('minimize-window-by-title', title),
  closeWindowByTitle: (title: string) => ipcRenderer.send('close-window-by-title', title),
  getWindowTitle: () => window.document.title
});