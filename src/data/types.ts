export interface User {
  id: string;
  name: string;
  username?: string;
}

export interface Message {
  from: User;
  message: string;
}
