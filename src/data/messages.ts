import { Message } from "./types";
import { USERS } from "./users";

export const MESSAGES: Map<keyof typeof USERS, Message[]> = new Map([
  ['felix', [
    { from: USERS['felix'], message: "Hey there! How's it going?" },
    { from: USERS['felix'], message: "Did you check out that new movie?" },
    { from: USERS['felix'], message: "Let's catch up sometime soon!" }
  ]]
]);