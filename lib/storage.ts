export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  createdAt: string;
};

const KEY = 'nixon_chat_messages_v1';

export const saveMessages = (messages: Message[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('saveMessages failed', e);
  }
};

export const loadMessages = (): Message[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('loadMessages failed', e);
    return [];
  }
};