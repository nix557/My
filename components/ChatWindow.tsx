import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Message } from '../lib/storage';

export default function ChatWindow({ messages, typing }: { messages: Message[]; typing: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div ref={ref} className="flex-1 overflow-auto p-4 max-w-3xl mx-auto">
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}

      {typing && (
        <div className="flex justify-start my-2">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
            <div className="flex gap-1 items-end">
              <span className="h-2 w-2 rounded-full animate-bounce bg-gray-500 inline-block"></span>
              <span className="h-2 w-2 rounded-full animate-bounce bg-gray-500 inline-block" style={{ animationDelay: '0.12s' }}></span>
              <span className="h-2 w-2 rounded-full animate-bounce bg-gray-500 inline-block" style={{ animationDelay: '0.24s' }}></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}