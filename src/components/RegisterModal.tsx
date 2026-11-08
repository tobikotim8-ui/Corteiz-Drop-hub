import React, { useState } from 'react';
import { Product, RegistrationRecord } from '../data/products';
import { X, CheckCircle2, Copy, Check, MessageSquare, Bell } from 'lucide-react';

interface RegisterModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: (record: RegistrationRecord) => void;
  onAskAssistantAboutProduct: (productName: string) => void;
  existingRegistration?: RegistrationRecord;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  product,
  onClose,
  onSuccess,
  onAskAssistantAboutProduct,
  existingRegistration,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    existingRegistration?.size || product.availableSizes[0] || 'M'
  );
  const [selectedColour, setSelectedColour] = useState<string>(
    existingRegistration?.colour || product.availableColours[0] || 'Black'
  );
  const [name, setName] = useState<string>(existingRegistration?.customerName || '');
  const [email, setEmail] = useState<string>(existingRegistration?.customerEmail || '');
  const [notifyOnDrop, setNotifyOnDrop] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address for drop notifications.');
      return;
    }

    const code =
      existingRegistration?.confirmationCode ||
      `CRTZ-DH-${Math.floor(1000 + Math.random() * 9000)}`;

    const record: RegistrationRecord = {
      id: existingRegistration?.id || `reg_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      colour: selectedColour,
      customerName: name.trim(),
      customerEmail: email.trim(),
      registeredAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      confirmationCode: code,
      notifyOnDrop,
    };

    setSubmittedRecord(record);
    onSuccess(record);
  };

  const handleCopyCode = () => {
    if (submittedRecord) {
      navigator.clipboard.writeText(submittedRecord.confirmationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#111317] border border-[#232730] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2229]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Customer Journey · Steps 4 &amp; 5
            </span>
            <h2 id="register-modal-title" className="text-base font-bold text-white uppercase font-display">
              {submittedRecord ? 'Registration Confirmed' : 'Register Your Interest'}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedRecord ? (
            /* Confirmation Screen (Step 6 & 7) */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">
                  Step 6 Completed
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-display mt-1">
                  Interest Registered!
                </h3>
                <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your interest for the <strong className="text-white">{product.name}</strong> has been logged on Corteiz Drop Hub.
                </p>
              </div>

              {/* Confirmation Pass Ticket */}
              <div className="bg-[#16181f] border border-[#272b35] rounded-xl p-5 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#242832]">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">
                      Confirmation Code
                    </span>
                    <div className="font-mono text-base font-bold text-white tracking-wider">
                      #{submittedRecord.confirmationCode}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400">Selected Product:</span>
                    <div className="text-white font-medium">{product.name}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400">Selected Size:</span>
                    <div className="text-white font-mono">{submittedRecord.size}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400">Selected Colour:</span>
                    <div className="text-white font-medium">{submittedRecord.colour}</div>
                  </div>
                  <div>
                    <span className="text-neutral-400">Registered Name:</span>
                    <div className="text-white font-medium">{submittedRecord.customerName}</div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-neutral-400 border-t border-[#242832]">
                  <span>Drop Alert Email: </span>
                  <span className="text-neutral-200 font-mono">{submittedRecord.customerEmail}</span>
                </div>
              </div>

              {/* Step 7 Journey Callout */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3 text-left flex items-start gap-3 text-xs text-neutral-300">
                <Bell className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">Step 7 of Customer Journey:</strong>
                  <p className="mt-0.5 text-neutral-400">
                    You will receive a notification when more information about the drop becomes available.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onAskAssistantAboutProduct(product.name);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Assistant About Item</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black cursor-pointer transition-colors"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form (Steps 4 & 5) */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Preview Strip */}
              <div className="flex items-center gap-4 p-3 bg-[#16181e] rounded-xl border border-[#222630]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-lg bg-black"
                />
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase font-display">
                    {product.name}
                  </h3>
                  <span className="text-xs text-neutral-400">{product.pricingNotice}</span>
                </div>
              </div>

              {/* Step 4A: Select Preferred Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  1. Select Preferred Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors ${
                        selectedSize === sz
                          ? 'bg-white text-black ring-2 ring-white/20'
                          : 'bg-[#1b1e25] text-neutral-300 hover:text-white hover:bg-[#232731] border border-neutral-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4B: Select Preferred Colour */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  2. Select Preferred Colour:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableColours.map((clr) => (
                    <button
                      type="button"
                      key={clr}
                      onClick={() => setSelectedColour(clr)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                        selectedColour === clr
                          ? 'bg-white text-black ring-2 ring-white/20'
                          : 'bg-[#1b1e25] text-neutral-300 hover:text-white hover:bg-[#232731] border border-neutral-800'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 pt-2 border-t border-[#1f2229]">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs font-medium text-neutral-300 mb-1"
                  >
                    Your Full Name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam Walker"
                    className="w-full bg-[#16181e] border border-neutral-800 focus:border-white focus:outline-none rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-email"
                    className="block text-xs font-medium text-neutral-300 mb-1"
                  >
                    Your Email Address (for drop updates)
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. liam@example.com"
                    className="w-full bg-[#16181e] border border-neutral-800 focus:border-white focus:outline-none rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-sans"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="notify-drop"
                    checked={notifyOnDrop}
                    onChange={(e) => setNotifyOnDrop(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#16181e] border-neutral-700 text-white accent-white cursor-pointer"
                  />
                  <label
                    htmlFor="notify-drop"
                    className="text-xs text-neutral-400 cursor-pointer select-none"
                  >
                    Receive notification when more drop information becomes available
                  </label>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Step 5 CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-lg hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-white/5"
                >
                  Register My Interest
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2 font-mono">
                  Student Project Hub · No immediate payment required
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
