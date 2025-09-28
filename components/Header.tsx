import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">N</div>
          <h1 className="text-lg font-semibold">Nixon Assistant</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">PWA • Gemini 2.5 Flash</div>
      </div>
    </header>
  );
}
