import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AVINKUMARS', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/avinkumar-s-499375240/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/AVINKUM08114883', label: 'Twitter' },
    { icon: Mail, href: 'mailto:avinkumar417@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-grey/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#"
              className="font-display text-4xl text-white hover:text-red transition-colors inline-block mb-4"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              AVIN<span className="text-red">KUMAR</span>
            </motion.a>
            <p className="text-light-grey mb-6 max-w-sm">
              Full-stack developer passionate about creating digital experiences that make a difference.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-red/50 transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/60 group-hover:text-red transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl text-white mb-6">Quick Links</h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-light-grey hover:text-red transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl text-white mb-6">Get In Touch</h3>
            <div className="space-y-3">
              <p className="text-light-grey">
                <span className="text-white">Email:</span><br />
                avinkumar417@gmai.com
              </p>
              <p className="text-light-grey">
                <span className="text-white">Location:</span><br />
                Chennai, India
              </p>
              <p className="text-light-grey">
                <span className="text-white">Availability:</span><br />
                Open to opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-light-grey text-sm text-center sm:text-left">
            &copy; {currentYear} Avin Kumar S. All rights reserved.
          </p>
          
          <p className="text-light-grey text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red fill-red" /> using React & Tailwind
          </p>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-red/50 transition-all duration-300 group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-white/60 group-hover:text-red transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
