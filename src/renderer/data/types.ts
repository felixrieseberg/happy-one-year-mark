export interface User {
  id: string;
  name: string;
  screenname?: string;
}

export interface Message {
  from: User;
  message: string;
  images?: string[];
}
