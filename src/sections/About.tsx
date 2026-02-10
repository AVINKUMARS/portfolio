import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageRadius = useTransform(scrollYProgress, [0, 0.5, 1], ['50%', '20px', '0px']);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading stroke animation
      gsap.fromTo('.about-heading',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
      
      // Text lines reveal
      gsap.fromTo('.about-text-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
          }
        }
      );
      
      // Stats counter animation
      gsap.fromTo('.about-stat',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '20+', label: 'PROJECTS' },
    { value: '2+', label: 'YEARS' },
    { value: '99%', label: 'SATISFACTION' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background Text */}
      <motion.div 
        style={{ y: bgTextY }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none"
      >
        <span className="font-display text-[20vw] text-white/[0.03] whitespace-nowrap">
          ABOUT
        </span>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Who I Am
          </motion.span>
          <h2 className="about-heading font-display text-5xl sm:text-6xl md:text-7xl text-white">
            ABOUT ME
          </h2>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="about-content space-y-6">
            <p className="about-text-line text-xl sm:text-2xl text-white leading-relaxed">
              With over <span className="text-red font-medium">2 years of experience</span> in full-stack development, I specialize in building scalable applications that solve real-world problems.
            </p>
            
            <p className="about-text-line text-lg text-light-grey leading-relaxed">
              My journey began with a curiosity for how things work, which evolved into a passion for creating elegant solutions through code. I believe in the power of clean architecture, reusable components, and performance optimization.
            </p>
            
            <p className="about-text-line text-lg text-light-grey leading-relaxed">
              Currently working at <span className="text-white font-medium">ScalingWolf AI</span>, I help startups transform their ideas into production-ready products. My focus is on delivering exceptional user experiences while maintaining code quality and scalability.
            </p>
            
            {/* Skills Tags */}
            <div className="about-text-line flex flex-wrap gap-2 pt-4">
              {['React', 'TypeScript', 'Node.js', 'Go', 'MongoDB', 'AWS'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 hover:border-red/50 hover:text-red transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right: Image */}
          <div ref={imageRef} className="relative">
            {/* SVG Connection Line */}
            <svg 
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-20 h-40 hidden lg:block"
              viewBox="0 0 80 160"
            >
              <motion.path
                d="M0,80 Q40,80 40,40 T80,0"
                fill="none"
                stroke="rgba(255, 0, 0, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
            
            {/* Image Container with Morphing Mask */}
            <motion.div 
              style={{ borderRadius: imageRadius }}
              className="relative overflow-hidden aspect-[4/5] bg-dark-grey"
            >
              <img 
                src="/about-portrait.jpg" 
                alt="About Portrait"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              
              {/* Hover Ripple Effect */}
              <motion.div 
                className="absolute inset-0 bg-red/10 opacity-0 hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 border border-red/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-red/10 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
        
        {/* Stats */}
        <div className="about-stats grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10">
          {stats.map((stat) => (
            <motion.div 
              key={stat.label}
              className="about-stat text-center"
              whileHover={{ y: -5 }}
            >
              <span className="font-display text-4xl sm:text-5xl md:text-6xl text-red block mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-light-grey tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
