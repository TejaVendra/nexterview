// Faqs.jsx
import React, { useState } from 'react';
import { faqs } from '../../data/faqs.js';
import FaqCard from '../ui/FaqCard.jsx';
import { motion } from 'motion/react';



const Faqs = () => {
  const [openId, setOpenId] = useState(null);



  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Split FAQs into two columns for desktop
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midPoint);
  const rightColumn = faqs.slice(midPoint);

  return (
    <motion.section  initial={{opacity:0,y:30,scale:0.9545}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:0.6}} viewport={{amount:0.3 , once:true}} className="flex justify-center mt-10 px-4">
      <div className="flex flex-col justify-center text-center mx-auto max-w-6xl w-full">
        {/* Heading */}
        <h2 className="hidden sm:block text-4xl md:text-5xl lg:text-6xl font-semibold">
          <span className="text-gray-500">Frequently </span>Asked Questions
        </h2>
        <h2 className="sm:hidden text-4xl md:text-5xl font-semibold">
          <span className="text-gray-500">F</span>AQs
        </h2>

        {/* Subtitle */}
        <p className="hidden sm:block mt-4 text-gray-600 text-lg">
          Everything you need to know about our AI-powered interview preparation platform.
        </p>

        {/* FAQ Grid */}
        <div className="flex flex-col lg:flex-row mt-10 gap-6 justify-center items-start w-full" >
          <div className="flex flex-col w-full lg:w-1/2">
            {leftColumn.map((faq) => (
              <FaqCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
            {rightColumn.map((faq) => (
              <FaqCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Faqs;