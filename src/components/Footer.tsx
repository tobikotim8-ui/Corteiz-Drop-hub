import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08090b] border-t border-[#1a1c22] py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-white font-black uppercase font-display text-sm tracking-tight block">
            CORTEIZ DROP HUB
          </span>
          <p className="mt-1 text-neutral-400 max-w-md text-xs leading-relaxed">
            Educational student project created to demonstrate product exploration, interest registration, and AI customer support assistance. Not affiliated with or endorsed by Corteiz.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1.5 font-mono text-[11px] text-neutral-400">
          <div>Corteiz Drop Hub · Academic Demonstration</div>
          <div>All trademarks remain property of their respective owners.</div>
        </div>
      </div>
    </footer>
  );
};
