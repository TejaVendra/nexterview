import React from 'react';
import { Copyright } from 'lucide-react';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from '../../assets/Logo.png';
import { motion } from 'motion/react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaXTwitter, href: 'https://twitter.com', label: 'X (Twitter)' },
  ];

  return (
    <motion.footer initial={{opacity:0,y:30,scale:0.9545}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:0.6}} viewport={{amount:0.3 , once:true}} className="pb-10 bg-gradient-to-b from-transparent to-gray-50/50">
      <div className="mt-10 w-[95%] max-w-7xl mx-auto rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
              className="h-20 w-20 md:h-24 md:w-24 object-contain hover:scale-105 transition-transform duration-300" 
              src={Logo} 
              alt="InterviewAI Logo"
              loading="lazy"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200  hover:scale-95"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4" aria-label="Social media links">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
              
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 w-[90%] mx-auto mt-6" />

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 py-5 text-sm text-gray-500">
          <p className="flex items-center gap-1">
            <Copyright size={14} className="inline-block" />
            <span>{currentYear} Nexterview.</span>
          </p>
          <span className="hidden sm:inline text-gray-500">|</span>
          <p>All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;