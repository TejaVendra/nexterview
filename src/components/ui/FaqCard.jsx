// FaqCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
const FaqCard = ({ faq, isOpen, onToggle }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight || 0);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div 
      className="flex flex-col p-6 mb-4 bg-white/50 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg hover:scale-105 hover:translate-x-1 transition-all duration-300 w-full border border-gray-100/50"
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="flex justify-between items-start gap-4 w-full text-left rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="font-medium text-gray-800 pr-4">
          {faq.question}
        </span>
        <span 
          className={`text-2xl font-light text-gray-400 hover:text-gray-700 transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <Plus size={23} />
        </span>
      </button>

      {/* Answer with smooth animation */}
      <div
        id={`faq-answer-${faq.id}`}
        ref={contentRef}
        style={{ 
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
          overflow: 'hidden'
        }}
        className="mt-2"
      >
        <div className="pt-3 text-start text-gray-600 text-sm leading-relaxed border-t border-gray-100">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FaqCard;