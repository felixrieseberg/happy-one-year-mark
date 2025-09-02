import Anthropic from '@anthropic-ai/sdk';

let anthropicClient: Anthropic | null = null;

export async function initializeAnthropic(): Promise<boolean> {
  try {
    const apiKey = await window.electronAPI.getApiKey();
    if (!apiKey) {
      return false;
    }
    
    anthropicClient = new Anthropic({
      apiKey: apiKey,
      // Since we're in a browser environment, we need to use a proxy
      // The actual API calls will be made from the main process
      dangerouslyAllowBrowser: true
    });
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Anthropic:', error);
    return false;
  }
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessageToClaude(message: string, conversationHistory: ConversationMessage[]): Promise<string> {
  console.log('sendMessageToClaude called with:', { message, historyLength: conversationHistory.length });
  
  try {
    // Call through IPC to main process
    console.log('Calling Claude through IPC...');
    const response = await window.electronAPI.sendClaudeMessage(message, conversationHistory);
    console.log('Got response from main process:', response);
    return response;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    if (error instanceof Error && error.message?.includes('Invalid API key')) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to send message to Claude');
  }
}

export async function storeApiKey(apiKey: string): Promise<void> {
  await window.electronAPI.storeApiKey(apiKey);
  anthropicClient = null; // Reset client to force reinitialization
}

export async function hasApiKey(): Promise<boolean> {
  const apiKey = await window.electronAPI.getApiKey();
  return !!apiKey;
}