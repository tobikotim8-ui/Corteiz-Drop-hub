import React from 'react';
import { MessageSquare, BookmarkCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAssistant: () => void;
  onOpenRegistrations: () => void;
  registrationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAssistant,
  onOpenRegistrations,
  registrationCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0c0e]/90 backdrop-blur-md border-b border-[#1f2227]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-black tracking-tight text-white uppercase whitespace-nowrap shrink-0 font-display hover:text-neutral-200 transition-colors"
        >
          CORTEIZ DROP HUB
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#products"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Available Products
          </a>
          <a
            href="#journey"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Customer Journey
          </a>
          <button
            onClick={onOpenRegistrations}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span>My Registrations</span>
            {registrationCount > 0 && (
              <span className="text-[11px] font-mono font-semibold px-1.5 py-0.2 bg-neutral-800 text-neutral-200 rounded border border-neutral-700">
                {registrationCount}
              </span>
            )}
          </button>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Registration Guide
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRegistrations}
            className="md:hidden p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg relative cursor-pointer"
            aria-label="View registrations"
          >
            <BookmarkCheck className="w-5 h-5" />
            {registrationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {registrationCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-black bg-white rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Drop Assistant</span>
          </button>
        </div>
      </div>
    </header>
  );
};
