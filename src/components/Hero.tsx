import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenAssistant }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#1b1e23] overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Subtle text kicker without badge sandwich */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            <span className="text-neutral-300 font-semibold">Corteiz Drop Hub</span>
            <span aria-hidden="true">·</span>
            <span>Upcoming Release Roster</span>
            <span aria-hidden="true">·</span>
            <span>Interest Ledger</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display leading-[1.05] text-balance mb-6">
            EXPLORE THE ROSTER. <br />
            <span className="text-neutral-400">REGISTER YOUR INTEREST.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
            Browse the 6 featured products available on Corteiz Drop Hub. Choose your preferred size and colour, submit your registration, and receive priority notifications once drop information is confirmed.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 text-sm font-bold text-black bg-white rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
            >
              <span>Explore 6 Products</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAssistant}
              className="px-6 py-3 text-sm font-bold text-white bg-[#16181d] border border-neutral-700 hover:border-neutral-500 rounded-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-neutral-300" />
              <span>Ask Drop Assistant</span>
            </button>
          </div>
        </div>

        {/* Quiet 4-column informational strip */}
        <div className="mt-16 pt-8 border-t border-[#1f2227] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-neutral-400">
          <div>
            <div className="font-mono text-white text-base font-bold tabular-nums">06</div>
            <div className="mt-1 text-neutral-400">Curated Drop Products</div>
          </div>
          <div>
            <div className="font-mono text-white text-base font-bold">Size &amp; Colour</div>
            <div className="mt-1 text-neutral-400">Tailored Variant Preference</div>
          </div>
          <div>
            <div className="font-mono text-white text-base font-bold">Instant Pass</div>
            <div className="mt-1 text-neutral-400">Verified Registration Code</div>
          </div>
          <div>
            <div className="flex items-center gap-1 font-mono text-white text-base font-bold">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span>Project Demo</span>
            </div>
            <div className="mt-1 text-neutral-400">Student Showcase Platform</div>
          </div>
        </div>
      </div>
    </section>
  );
};
