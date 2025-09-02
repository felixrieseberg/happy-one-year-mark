export interface User {
  id: string;
  name: string;
  avatar?: string;
  screenname?: string;
}

export interface Message {
  from: User;
  message: string;
  attachments?: string[];
}
