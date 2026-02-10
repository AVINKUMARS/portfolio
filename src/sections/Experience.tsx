import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      role: 'Full Stack Developer',
      company: 'ScalingWolf AI',
      location: 'Remote',
      period: '2025 - Present',
      description: [
        'Leading development of AI-powered SaaS products using React and Go',
        'Architecting scalable microservices handling 10K+ daily active users',
        'Implementing real-time data pipelines with WebSocket and Redis',
        'Mentoring junior developers and establishing code review practices',
      ],
      technologies: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      role: 'Full Stack Intern',
      company: 'Consumable AI',
      location: 'Remote',
      period: '2024 - 2025',
      description: [
        'Built responsive dashboards using Next.js and Tailwind CSS',
        'Developed RESTful APIs with Node.js and Express',
        'Integrated AWS services (S3, Lambda, CloudFront) for media handling',
        'Optimized database queries reducing response time by 40%',
      ],
      technologies: ['Next.js', 'Node.js', 'AWS', 'MongoDB', 'Tailwind CSS'],
    },
    {
      role: 'Web Development Intern',
      company: 'Cognifyz',
      location: 'Remote',
      period: '2024',
      description: [
        'Developed interactive web applications using React and JavaScript',
        'Collaborated with UI/UX team to implement pixel-perfect designs',
        'Implemented authentication flows and user management systems',
        'Participated in agile sprints and code reviews',
      ],
      technologies: ['React', 'JavaScript', 'HTML/CSS', 'Firebase'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline path draw
      gsap.fromTo('.timeline-path',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        }
      );
      
      // Cards 3D snap animation
      gsap.fromTo('.experience-card',
        { rotateX: 45, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          }
        }
      );
      
      // Timeline nodes
      gsap.fromTo('.timeline-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-void" />
      
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
            My Journey
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            EXPERIENCE
          </h2>
          <p className="text-light-grey max-w-2xl mx-auto">
            A timeline of my professional growth and the companies I've had the privilege to work with.
          </p>
        </div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                className="timeline-path"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="url(#timelineGradient)"
                strokeWidth="2"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
              />
              <defs>
                <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff0000" stopOpacity="0" />
                  <stop offset="20%" stopColor="#ff0000" stopOpacity="1" />
                  <stop offset="80%" stopColor="#ff0000" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, i) => (
              <div 
                key={exp.company}
                className={`
                  relative lg:grid lg:grid-cols-2 lg:gap-8
                  ${i % 2 === 0 ? '' : 'lg:direction-rtl'}
                `}
              >
                {/* Timeline Node */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <motion.div 
                    className="timeline-node w-4 h-4 bg-red rounded-full border-4 border-void"
                    whileHover={{ scale: 1.5 }}
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(255, 0, 0, 0.4)',
                        '0 0 0 10px rgba(255, 0, 0, 0)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Card */}
                <div 
                  className={`
                    experience-card lg:direction-ltr
                    ${i % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'}
                  `}
                >
                  <motion.div 
                    className="glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-red/30 transition-all duration-500 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    style={{ perspective: 1000 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl text-white group-hover:text-red transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Briefcase className="w-4 h-4 text-red" />
                          <span className="text-white/80 font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-light-grey text-sm">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2 text-light-grey text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-light-grey">
                          <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs bg-white/5 text-white/70 rounded-full border border-white/10 hover:border-red/50 hover:text-red transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Spacer for alternating layout */}
                {i % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
