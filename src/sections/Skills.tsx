import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: number;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const skills: Skill[] = [
    { name: 'React', category: 'frontend', level: 95 },
    { name: 'TypeScript', category: 'frontend', level: 90 },
    { name: 'Tailwind CSS', category: 'frontend', level: 92 },
    { name: 'HTML/CSS', category: 'frontend', level: 95 },
    { name: 'Next.js', category: 'frontend', level: 85 },
    { name: 'Node.js', category: 'backend', level: 88 },
    { name: 'Express', category: 'backend', level: 85 },
    { name: 'Go', category: 'backend', level: 75 },
    { name: 'Python', category: 'backend', level: 80 },
    { name: 'Supabase', category: 'database', level: 82 },
    { name: 'MongoDB', category: 'database', level: 85 },
    { name: 'PostgreSQL', category: 'database', level: 78 },
    { name: 'Git', category: 'tools', level: 90 },
    { name: 'Figma', category: 'tools', level: 75 },
    { name: 'Docker', category: 'tools', level: 70 },
    { name: 'AWS', category: 'tools', level: 72 },
  ];

  const categories = {
    frontend: { color: '#ff0000', label: 'Frontend' },
    backend: { color: '#00ff88', label: 'Backend' },
    database: { color: '#0088ff', label: 'Database' },
    tools: { color: '#ffaa00', label: 'Tools' },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skills implosion animation
      gsap.fromTo('.skill-node',
        { scale: 3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'center'
          },
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
      
      // Connection lines draw
      gsap.fromTo('.skill-connection',
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Floating animation for each node
  useEffect(() => {
    const nodes = document.querySelectorAll('.skill-node');
    nodes.forEach((node, i) => {
      gsap.to(node, {
        y: `+=${Math.sin(i) * 10}`,
        x: `+=${Math.cos(i) * 5}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cloudRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 20,
        y: (e.clientY - rect.top - rect.height / 2) / 20,
      });
    }
  };

  // Position skills in a cloud formation
  const getSkillPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 120 + (index % 3) * 60;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.7;
    return { x, y };
  };

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-dark-grey/20 to-void" />
      
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
            My Expertise
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            SKILLS
          </h2>
          <p className="text-light-grey max-w-2xl mx-auto">
            A constellation of technologies I've mastered throughout my journey as a developer.
          </p>
        </div>
        
        {/* Skills Cloud */}
        <div 
          ref={cloudRef}
          className="relative h-[500px] sm:h-[600px] flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          {/* Center Label */}
          <motion.div 
            className="absolute z-20 glass px-6 py-3 rounded-full"
            animate={{ 
              x: mousePos.x * -0.5,
              y: mousePos.y * -0.5,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <span className="font-display text-xl text-white tracking-wider">CORE</span>
          </motion.div>
          
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {skills.map((skill, i) => {
              const pos = getSkillPosition(i, skills.length);
              return (
                <motion.line
                  key={`connection-${i}`}
                  className="skill-connection"
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${pos.x}px)`}
                  y2={`calc(50% + ${pos.y}px)`}
                  stroke={categories[skill.category].color}
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="200"
                  initial={{ strokeDashoffset: 200 }}
                />
              );
            })}
          </svg>
          
          {/* Skill Nodes */}
          {skills.map((skill, i) => {
            const pos = getSkillPosition(i, skills.length);
            const isHovered = hoveredSkill === skill.name;
            
            return (
              <motion.div
                key={skill.name}
                className="skill-node absolute"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                }}
                animate={{
                  x: mousePos.x * (0.5 + i * 0.05),
                  y: mousePos.y * (0.5 + i * 0.05),
                }}
                transition={{ type: 'spring', stiffness: 50 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <motion.div
                  className={`
                    relative px-4 py-2 rounded-full cursor-pointer
                    border transition-all duration-300
                    ${isHovered ? 'border-red bg-red/20' : 'border-white/10 bg-white/5'}
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`
                    text-sm font-medium whitespace-nowrap
                    ${isHovered ? 'text-white' : 'text-white/70'}
                  `}>
                    {skill.name}
                  </span>
                  
                  {/* Glow on hover */}
                  {isHovered && (
                    <motion.div
                      layoutId="skill-glow"
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 20px ${categories[skill.category].color}40`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
                
                {/* Level indicator on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{ backgroundColor: categories[skill.category].color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-white/60">{skill.level}%</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {Object.entries(categories).map(([key, { color, label }]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-light-grey">{label}</span>
            </div>
          ))}
        </div>
        
        {/* Skills Grid (Alternative View) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {Object.entries(categories).map(([key, { label }]) => (
            <motion.div 
              key={key}
              className="glass p-4 rounded-xl"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-display text-lg text-white mb-3">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(s => s.category === key)
                  .map(skill => (
                    <span 
                      key={skill.name}
                      className="text-xs text-white/60 px-2 py-1 bg-white/5 rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
