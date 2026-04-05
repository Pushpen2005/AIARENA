import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Send, Zap } from 'lucide-react';
import axios from 'axios';

export default function ChatInterface({ messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/invoke', { input });
      const data = response.data.data;
      onSendMessage(input, data);
      setInput('');
    } catch (error) {
      console.error('Error invoking backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-grid scanlines">

      {/* ── Header ── */}
      <header className="header-neon sticky top-0 z-20 shrink-0 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap size={22} className="text-[#00f5ff]" style={{ filter: 'drop-shadow(0 0 8px #00f5ff)' }} />
          </div>
          <h1
            className="neon-text text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            AIARENA
          </h1>
        </div>
        <div
          className="text-xs tracking-[0.2em] text-white/30 uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SYSTEM ONLINE
        </div>
      </header>

      {/* ── Chat History ── */}
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-lg px-4">
              <div
                className="neon-text text-5xl font-black mb-4 leading-tight"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                ENTER THE ARENA
              </div>
              <p
                className="text-white/40 text-sm tracking-widest uppercase mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Two AI models. One judge. Zero mercy.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {['Algorithm design', 'Code review', 'Architecture debate'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="glass border border-white/10 text-white/50 text-xs px-4 py-2 rounded-full
                               hover:border-[#00f5ff]/40 hover:text-[#00f5ff] transition-all duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-0">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} index={idx} />
          ))}
        </div>
        <div ref={endRef} className="h-8" />
      </main>

      {/* ── Input Bar ── */}
      <footer className="shrink-0 bg-black/90 backdrop-blur-xl border-t border-white/5 p-6">
        <div className="max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="neon-input relative flex items-end glass border border-white/10 rounded-xl transition-all duration-300"
          >
            <textarea
              className="w-full bg-transparent text-white placeholder:text-white/25 border-0 outline-none resize-none
                         px-5 py-4 min-h-[60px] max-h-40 rounded-xl text-sm leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              placeholder="Describe a problem for the AI models to battle over..."
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn-neon absolute right-3 bottom-3 p-2.5 rounded-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </form>
          <p
            className="text-center mt-3 text-[10px] text-white/20 tracking-widest uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </footer>
    </div>
  );
}
