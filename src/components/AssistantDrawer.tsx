import React, { useState, useRef, useEffect } from 'react';
import { Send, X, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const PRESET_PROMPTS = [
  'What products are available?',
  'How do I register my interest?',
  'When is the next official Corteiz drop?',
  'Which product should I choose?',
  'How much does the Alcatraz Hoodie cost?',
];

export const AssistantDrawer: React.FC<AssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am the Corteiz Drop Assistant. I can help you explore the products available on Corteiz Drop Hub, understand how to register your interest, and answer any questions.\n\nPlease note: Corteiz Drop Hub is a student project and is not an official Corteiz website or service.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle passed initial prompt (e.g. from product card)
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Map conversation history
      const historyPayload = newMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload.slice(0, -1), // prior history excluding current message
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        "I don't have confirmed information about that on Corteiz Drop Hub.";

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error contacting assistant:', err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'model',
        text: "I don't have confirmed information about that on Corteiz Drop Hub.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'model',
        text: "Hello! I am the Corteiz Drop Assistant. I can help you explore the products available on Corteiz Drop Hub, understand how to register your interest, and answer any questions.\n\nPlease note: Corteiz Drop Hub is a student project and is not an official Corteiz website or service.",
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Corteiz Drop Assistant Chat"
      className="fixed bottom-0 right-0 z-50 w-full sm:w-[440px] h-[580px] max-h-[92vh] bg-[#111317] border-t sm:border-l border-[#242831] sm:rounded-tl-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
    >
      {/* Header */}
      <div className="px-5 py-4 bg-[#16181f] border-b border-[#242831] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-black font-black flex items-center justify-center font-display text-sm tracking-tight shadow-sm">
            CZ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white uppercase font-display tracking-tight">
                Corteiz Drop Assistant
              </h2>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              Hub Support &amp; Sizing Inquiries
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close Assistant"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Student Project Badge Disclaimer */}
      <div className="px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        <span>Student Project Hub · Not an official Corteiz service</span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-neutral-500 font-mono mb-1 px-1">
                {isUser ? 'You' : 'Drop Assistant'} · {m.timestamp}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-white text-black font-medium rounded-tr-none'
                    : 'bg-[#181a22] text-neutral-200 border border-[#272b35] rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="text-[10px] text-neutral-500 font-mono mb-1 px-1">
              Drop Assistant · Typing...
            </div>
            <div className="bg-[#181a22] border border-[#272b35] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-2 bg-[#14161d] border-t border-[#1f2229] overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {PRESET_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1d2028] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-[#292d38] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#16181f] border-t border-[#242831] flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about products, sizing, or how to register..."
          disabled={isLoading}
          className="flex-1 bg-[#111317] border border-neutral-800 focus:border-white focus:outline-none rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 text-black bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
