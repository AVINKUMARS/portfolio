import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textSpacing = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fluid background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    let animationId: number;
    let time = 0;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];
    
    // Create particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 150 + 100,
        color: i % 3 === 0 ? 'rgba(255, 0, 0, 0.08)' : 'rgba(26, 26, 26, 0.5)'
      });
    }
    
    const animate = () => {
      time += 0.005;
      ctx.fillStyle = '#040404';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Mouse interaction
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary check
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
        
        // Draw gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      tl.fromTo('.hero-name-char', 
        { y: '100%', skewY: 10 },
        { y: '0%', skewY: 0, duration: 1, stagger: 0.03 }
      )
      .fromTo('.hero-role',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo('.hero-tagline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.hero-image',
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' },
        '-=0.8'
      )
      .fromTo('.hero-cta',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      )
      .fromTo('.hero-social',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const nameChars = 'AVIN KUMAR S'.split('');

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Fluid Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain pointer-events-none" />
      
      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Name */}
            <h1 
              ref={nameRef}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none mb-4 overflow-hidden"
            >
              <motion.span 
                style={{ letterSpacing: textSpacing }}
                className="inline-flex flex-wrap justify-center lg:justify-start"
              >
                {nameChars.map((char, i) => (
                  <span key={i} className="hero-name-char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </motion.span>
            </h1>
            
            {/* Role */}
            <p className="hero-role font-display text-2xl sm:text-3xl md:text-4xl text-red mb-6">
              FULL-STACK DEVELOPER
            </p>
            
            {/* Tagline */}
            <p className="hero-tagline text-lg sm:text-xl text-light-grey max-w-xl mx-auto lg:mx-0 mb-8">
              I BUILD DIGITAL EXPERIENCES THAT MATTER.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg"
                className="bg-red hover:bg-red/90 text-white px-8 py-6 text-lg font-medium tracking-wider transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                [ VIEW PROJECTS ]
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-medium tracking-wider transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                CONTACT ME
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:avin@example.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social group relative p-3 border border-white/10 rounded-full hover:border-red/50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-red transition-colors" />
                  <span className="absolute inset-0 rounded-full bg-red/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Right: Profile Image */}
          <motion.div 
            style={{ y: imageY }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="hero-image relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-red/20 blur-[100px] rounded-full scale-75" />
              
              {/* Image Container */}
              <motion.div 
                className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img 
                  src="/hero-profile.png" 
                  alt="Avin Kumar S"
                  className="w-full h-full object-contain object-center"
                />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-sm font-medium text-white">2+ Years Exp.</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
