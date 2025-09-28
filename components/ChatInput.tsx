import React, { useState } from 'react';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  return (
    <form onSubmit={submit} className="w-full flex gap-2 items-center p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ketik pesan..."
        className="flex-1 px-3 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
        disabled={disabled}
      />
      <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-60" disabled={disabled || text.trim() === ''}>
        Kirim
      </button>
    </form>
  );
}
