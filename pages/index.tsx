import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { loadMessages, saveMessages } from '../lib/storage';
import { Message } from '../types/message';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { loadApiKey, saveApiKey } from '../lib/apiKey';

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const k = loadApiKey();
    if (k) setApiKey(k);

    const saved = loadMessages();
    if (saved.length) {
      setMessages(saved);
    } else {
      setMessages([
        {
          id: uuidv4(),
          role: 'assistant',
          text: 'Halo! Aku Nixon Assistant (Gemini 2.5 Flash). Masukkan API key untuk mulai!',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  if (!apiKey) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <h1 className="text-xl font-semibold mb-4">Masukkan API Key Gemini</h1>
        <input
          type="password"
          placeholder="API Key"
          className="px-3 py-2 border rounded-md w-full max-w-md"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={() => {
            const k = inputKey.trim();
            if (!k) return;
            saveApiKey(k);
            setApiKey(k);
          }}
        >
          Simpan dan Lanjutkan
        </button>
      </div>
    );
  }

  const send = async (text: string) => {
    const userMsg: Message = { id: uuidv4(), role: 'user', text, createdAt: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

    try {
      const res = await axios.post('/api/chat', { message: text, apiKey });
      const aiText = res.data?.reply || 'Maaf, tidak ada balasan.';
      const aiMsg: Message = { id: uuidv4(), role: 'assistant', text: aiText, createdAt: new Date().toISOString() };
      setMessages((m) => [...m, aiMsg]);
    } catch (err) {
      console.error(err);
      const failMsg: Message = { id: uuidv4(), role: 'assistant', text: 'Terjadi error saat memanggil Gemini.', createdAt: new Date().toISOString() };
      setMessages((m) => [...m, failMsg]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ChatWindow messages={messages} typing={typing} />
      <ChatInput onSend={send} disabled={typing} />
    </div>
  );
};

export default Home;
