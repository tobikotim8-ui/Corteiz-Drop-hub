import React from 'react';
import { JOURNEY_STEPS } from '../data/products';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  onExploreProducts: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onExploreProducts }) => {
  return (
    <section id="journey" className="py-20 border-b border-[#1b1e23] bg-[#0d0e11]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            Standard Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
            The Customer Journey
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Follow the 7-step process to explore available streetwear pieces, specify your size and colourway, and log your drop interest.
          </p>
        </div>

        {/* 7-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {JOURNEY_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className={`p-5 rounded-xl border transition-all ${
                idx === 4 || idx === 5
                  ? 'bg-[#15171e] border-neutral-700'
                  : 'bg-[#101216] border-[#1f2229]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-neutral-400">
                  Step {step.step}
                </span>
                {idx === 5 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-display mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

          {/* Quick CTA Card */}
          <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-transparent flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Ready to Start?
              </span>
              <h3 className="text-sm font-bold text-white uppercase font-display mt-2 mb-2">
                Choose An Item Now
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Explore the 6 products and select your preferred fit today.
              </p>
            </div>
            <button
              onClick={onExploreProducts}
              className="mt-4 py-2 px-3 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
