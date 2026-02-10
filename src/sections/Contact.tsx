import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'avinkumar417@gmail.com',
      href: 'mailto:avinkumar417@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, India',
      href: '#',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9159638728',
      href: 'tel:+919159638728',
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/AVINKUMARS' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/avinkumar-s-499375240/' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/AVINKUM08114883' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymZVKnLfQYrH8Wh17ro1OYQUb9FuUiCbHCZ2Of39KwtXF9BoaiyZc9UNE2tR-V2pmbEQ/exec';

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: '', email: '', message: '' });
        alert('✓ Thank you! Your message has been sent and saved.');
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-dark-grey/20 to-void" />
      
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Get In Touch
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            CONTACT
          </h2>
          <p className="text-light-grey max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's create something amazing together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="font-display text-3xl text-white mb-8"
            >
              Let's Talk
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-light-grey mb-8 leading-relaxed"
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the channels below.
            </motion.p>
            
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  variants={itemVariants}
                  href={info.href}
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-red/30 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center group-hover:bg-red/20 transition-colors">
                    <info.icon className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <span className="text-sm text-light-grey block">{info.label}</span>
                    <span className="text-white font-medium group-hover:text-red transition-colors">
                      {info.value}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-medium mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-red/50 transition-all duration-300 group"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-red transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right: Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={itemVariants}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              <h3 className="font-display text-2xl text-white mb-6">
                Send a Message
              </h3>
              
              <div className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label className="text-sm text-light-grey mb-2 block">Your Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red focus:ring-red/20 transition-all"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-red"
                    initial={{ width: 0 }}
                    whileFocus={{ width: '100%' }}
                  />
                </div>
                
                {/* Email Input */}
                <div className="relative">
                  <label className="text-sm text-light-grey mb-2 block">Your Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red focus:ring-red/20 transition-all"
                  />
                </div>
                
                {/* Message Textarea */}
                <div className="relative">
                  <label className="text-sm text-light-grey mb-2 block">Your Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-red focus:ring-red/20 transition-all resize-none"
                  />
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red hover:bg-red/90 text-white py-6 text-lg font-medium tracking-wider transition-all duration-300 hover:shadow-glow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      SEND MESSAGE
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
