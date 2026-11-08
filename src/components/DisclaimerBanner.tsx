import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside aria-label="Student Project Disclaimer" className="bg-amber-500/10 border-b border-amber-500/20 text-amber-200/90 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300 font-semibold uppercase tracking-wider">Student Project:</strong>{' '}
            Corteiz Drop Hub is a student project and is not an official Corteiz website or service.
          </span>
        </div>
        <span className="hidden md:inline-block text-amber-400/80 text-[11px] uppercase tracking-widest font-mono">
          Educational Demonstration
        </span>
      </div>
    </aside>
  );
};
