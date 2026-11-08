import React, { useState } from 'react';
import { RegistrationRecord } from '../data/products';
import { X, Trash2, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';

interface RegistrationsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationRecord[];
  onRemove: (id: string) => void;
  onAskAssistant: (productName: string) => void;
  onExploreProducts: () => void;
}

export const RegistrationsListModal: React.FC<RegistrationsListModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onRemove,
  onAskAssistant,
  onExploreProducts,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="registrations-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl bg-[#111317] border border-[#232730] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2229]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Customer Ledger
            </span>
            <h2 id="registrations-modal-title" className="text-base font-bold text-white uppercase font-display">
              My Registered Interests ({registrations.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {registrations.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-display">
                No Interests Registered Yet
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Explore the 6 products in the Corteiz Drop Hub catalog and select your preferred size and colour to register.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="mt-2 py-2 px-4 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 rounded-lg cursor-pointer transition-colors"
              >
                Browse Available Products
              </button>
            </div>
          ) : (
            registrations.map((reg) => (
              <div
                key={reg.id}
                className="p-4 bg-[#16181f] border border-[#242832] rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Confirmed Entry · {reg.registeredAt}
                    </span>
                    <h4 className="text-base font-bold text-white uppercase font-display">
                      {reg.productName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(reg.confirmationCode, reg.id)}
                      className="px-2 py-1 text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy confirmation code"
                    >
                      {copiedId === reg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>#{reg.confirmationCode}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onRemove(reg.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                      title="Cancel registration"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-[#222631]">
                  <div>
                    <span className="text-neutral-400 text-[11px]">Size: </span>
                    <span className="text-white font-mono">{reg.size}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[11px]">Colour: </span>
                    <span className="text-white">{reg.colour}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-neutral-400 text-[11px]">Contact: </span>
                    <span className="text-neutral-300 font-mono truncate block">
                      {reg.customerEmail}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px]">
                    Drop Notification: {reg.notifyOnDrop ? 'Active' : 'Muted'}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onAskAssistant(`I registered interest for the ${reg.productName}. Can you give me more details?`);
                    }}
                    className="text-neutral-300 hover:text-white flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Ask Assistant About Item</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#14161d] border-t border-[#1f2229] flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">
            Corteiz Drop Hub · Student Project Ledger
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-3 text-xs font-semibold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
