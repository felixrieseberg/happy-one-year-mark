
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessageToClaude(message: string, conversationHistory: ConversationMessage[]): Promise<string> {
  
  try {
    const response = await window.electronAPI.sendClaudeMessage(message, conversationHistory);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message?.includes('Invalid API key')) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to send message to Claude');
  }
}

export async function storeApiKey(apiKey: string): Promise<void> {
  await window.electronAPI.storeApiKey(apiKey);
}

export async function hasApiKey(): Promise<boolean> {
  const apiKey = await window.electronAPI.getApiKey();
  return !!apiKey;
}