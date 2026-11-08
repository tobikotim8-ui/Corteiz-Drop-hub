import React from 'react';
import { HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

interface RegistrationGuideFAQProps {
  onAskQuestion: (q: string) => void;
}

export const RegistrationGuideFAQ: React.FC<RegistrationGuideFAQProps> = ({
  onAskQuestion,
}) => {
  const faqs = [
    {
      question: 'How do I register my interest?',
      answer:
        'Explore the available products, select the one you are interested in, choose your preferred size and colour, and then click "Register My Interest." You will receive confirmation once your interest has been registered.',
      steps: [
        'Explore the available products.',
        'Select the product you are interested in.',
        'Choose your preferred size.',
        'Choose your preferred colour.',
        'Click "Register My Interest."',
        'You will receive confirmation that your interest has been registered.',
      ],
      prompt: 'How do I register my interest?',
    },
    {
      question: 'What products are available on Corteiz Drop Hub?',
      answer:
        'The available products on Corteiz Drop Hub are the Alcatraz Hoodie, CRTZ Cargo Pants, Corteiz Graphic T-Shirt, Corteiz Alcatraz Puffer Jacket, Corteiz Guerillaz Cargo Shorts and Corteiz 4Starz Cap.',
      prompt: 'What products are available?',
    },
    {
      question: 'When is the next official Corteiz drop?',
      answer:
        "I don't have confirmed information about official Corteiz release dates. I can only provide information available on Corteiz Drop Hub.",
      prompt: 'When is the next official Corteiz drop?',
    },
    {
      question: 'How much does the Alcatraz Hoodie cost?',
      answer:
        "I don't have confirmed pricing information for that product on Corteiz Drop Hub.",
      prompt: 'How much does the Alcatraz Hoodie cost?',
    },
  ];

  return (
    <section id="faq" className="py-20 border-b border-[#1b1e23] bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            Information &amp; Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
            Registration Guide &amp; Rules
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Essential facts about registering your interest on the Corteiz Drop Hub student platform and consulting the AI Drop Assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-6 bg-[#111317] border border-[#1f2229] rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-white uppercase font-display">
                    {faq.question}
                  </h3>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed pl-8">
                  {faq.answer}
                </p>

                {faq.steps && (
                  <ol className="mt-4 pl-8 space-y-1.5 text-xs text-neutral-400 list-decimal list-inside font-mono">
                    {faq.steps.map((s, i) => (
                      <li key={i} className="text-neutral-300">
                        {s}
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#1d2026] pl-8">
                <button
                  onClick={() => onAskQuestion(faq.prompt)}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Drop Assistant this question</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
