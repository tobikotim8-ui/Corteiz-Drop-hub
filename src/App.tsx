/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { RegisterModal } from './components/RegisterModal';
import { RegistrationsListModal } from './components/RegistrationsListModal';
import { AssistantDrawer } from './components/AssistantDrawer';
import { JourneySection } from './components/JourneySection';
import { RegistrationGuideFAQ } from './components/RegistrationGuideFAQ';
import { Footer } from './components/Footer';
import { PRODUCTS, Product, RegistrationRecord } from './data/products';
import { MessageSquare, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'crtz_drop_hub_registrations';

type CategoryFilter = 'All' | 'Hoodies & Tops' | 'Jackets' | 'Pants & Shorts' | 'Headwear';

export default function App() {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch (e) {
      console.warn('Failed to save registrations to localStorage', e);
    }
  }, [registrations]);

  const handleRegisterSuccess = (newRecord: RegistrationRecord) => {
    setRegistrations((prev) => {
      // Replace existing registration for same product or prepend
      const filtered = prev.filter((r) => r.productId !== newRecord.productId);
      return [newRecord, ...filtered];
    });
  };

  const handleRemoveRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenAssistantWithPrompt = (prompt: string) => {
    setAssistantPrompt(prompt);
    setIsAssistantOpen(true);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: 'All', count: PRODUCTS.length },
    { label: 'Hoodies & Tops', count: PRODUCTS.filter((p) => p.category === 'Hoodies & Tops').length },
    { label: 'Jackets', count: PRODUCTS.filter((p) => p.category === 'Jackets').length },
    { label: 'Pants & Shorts', count: PRODUCTS.filter((p) => p.category === 'Pants & Shorts').length },
    { label: 'Headwear', count: PRODUCTS.filter((p) => p.category === 'Headwear').length },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e5e7eb] flex flex-col selection:bg-white selection:text-black">
      {/* 1. Student Project Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. Top Bar Contract Header */}
      <Header
        onOpenAssistant={() => {
          setAssistantPrompt('');
          setIsAssistantOpen(true);
        }}
        onOpenRegistrations={() => setIsRegistrationsOpen(true)}
        registrationCount={registrations.length}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAssistant={() => {
            setAssistantPrompt('What products are available?');
            setIsAssistantOpen(true);
          }}
        />

        {/* 4. Product Catalog Section */}
        <section id="products" className="py-20 border-b border-[#1b1e23]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Official Roster · 06 Items
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
                  Available Drop Products
                </h2>
                <p className="mt-2 text-sm text-neutral-400 max-w-xl leading-relaxed">
                  Select an item to view sizing details and register your interest for upcoming drop availability.
                </p>
              </div>

              {/* Functional Segmented Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14161d] border border-[#20232b] rounded-xl self-start md:self-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat.label
                        ? 'bg-white text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1 text-[10px] opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isReg = registrations.some((r) => r.productId === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isRegistered={isReg}
                    onSelect={(p) => setActiveProductForModal(p)}
                  />
                );
              })}
            </div>

            {/* In-catalog Assistant Prompt Helper */}
            <div className="mt-12 p-6 bg-[#12141a] border border-[#20232b] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase font-display">
                    Unsure which product fits your style?
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Ask the Corteiz Drop Assistant to compare the 6 items or help you register.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenAssistantWithPrompt('Which product should I choose?')}
                className="py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-[#1d2028] text-white hover:bg-[#252934] border border-neutral-700 rounded-lg cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                Help Me Choose
              </button>
            </div>
          </div>
        </section>

        {/* 5. Customer Journey Section (7 Steps) */}
        <JourneySection
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. FAQ & Accuracy Rules Section */}
        <RegistrationGuideFAQ
          onAskQuestion={(q) => handleOpenAssistantWithPrompt(q)}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Product Registration Modal */}
      {activeProductForModal && (
        <RegisterModal
          product={activeProductForModal}
          onClose={() => setActiveProductForModal(null)}
          onSuccess={handleRegisterSuccess}
          onAskAssistantAboutProduct={(pName) => {
            setActiveProductForModal(null);
            handleOpenAssistantWithPrompt(`I registered interest for the ${pName}. What are the next steps?`);
          }}
          existingRegistration={registrations.find(
            (r) => r.productId === activeProductForModal.id
          )}
        />
      )}

      {/* Registered Interests Ledger Modal */}
      <RegistrationsListModal
        isOpen={isRegistrationsOpen}
        onClose={() => setIsRegistrationsOpen(false)}
        registrations={registrations}
        onRemove={handleRemoveRegistration}
        onAskAssistant={(prompt) => handleOpenAssistantWithPrompt(prompt)}
        onExploreProducts={() => {
          const el = document.getElementById('products');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive AI Assistant Drawer */}
      <AssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialPrompt={assistantPrompt}
      />

      {/* Floating Assistant Trigger (When Drawer is closed) */}
      {!isAssistantOpen && (
        <button
          onClick={() => {
            setAssistantPrompt('');
            setIsAssistantOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all group"
          aria-label="Open Corteiz Drop Assistant"
        >
          <MessageSquare className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
          <span>Ask Assistant</span>
        </button>
      )}
    </div>
  );
}
