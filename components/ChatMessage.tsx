import { Message } from '../lib/storage';

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={\`flex \${isUser ? 'justify-end' : 'justify-start'} my-2\`}>
      <div className={\`max-w-[80%] px-4 py-2 rounded-lg \${isUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}\`}>
        <div className="text-sm whitespace-pre-wrap">{message.text}</div>
        <div className="text-[10px] text-gray-500 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}