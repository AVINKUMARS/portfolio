import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, MessageSquare, LayoutDashboard, Layers, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  icon: React.ElementType;
  color: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 2,
      title: 'Meera Interiors',
      description: 'Client Project: A modern, elegant landing page designed for an interior design firm.',
      image: '/meera-interiors.jpg',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://meera-upvc.vercel.app/',
      githubUrl: 'https://github.com/AVINKUMARS/MeeraUPVC',
      icon: LayoutDashboard,
      color: '#10b981',
    },
    {
      id: 3,
      title: 'Beauty Parlour Landing Page',
      description: 'Client Project: A beautiful, responsive landing page for a beauty parlour business.',
      image: '/beauty-parlour.jpg',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://beauty-parlour-landing-page-two.vercel.app/',
      githubUrl: 'https://github.com/AVINKUMARS/Beauty-Parlour-LandingPage',
      icon: Layers,
      color: '#ef4444',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline path draw
      gsap.fromTo('.project-timeline-path',
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
      gsap.fromTo('.project-card',
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
      gsap.fromTo('.project-timeline-node',
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
      id="projects"
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
            Featured Work
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            PROJECTS
          </h2>
          <p className="text-light-grey max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building exceptional digital experiences.
          </p>
        </div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                className="project-timeline-path"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="url(#projectTimelineGradient)"
                strokeWidth="2"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
              />
              <defs>
                <linearGradient id="projectTimelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff0000" stopOpacity="0" />
                  <stop offset="20%" stopColor="#ff0000" stopOpacity="1" />
                  <stop offset="80%" stopColor="#ff0000" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Project Cards */}
          <div className="space-y-12 lg:space-y-0">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <div 
                  key={project.id}
                  className={`
                    relative lg:grid lg:grid-cols-2 lg:gap-8
                    ${i % 2 === 0 ? '' : 'lg:direction-rtl'}
                  `}
                >
                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <motion.div 
                      className="project-timeline-node w-4 h-4 bg-red rounded-full border-4 border-void"
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
                      project-card lg:direction-ltr
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
                          <h3 className="font-display text-2xl sm:text-3xl text-white group-hover:text-red transition-colors flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${project.color}20` }}
                            >
                              <Icon className="w-5 h-5" style={{ color: project.color }} />
                            </div>
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Project Image */}
                      <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-dark-grey/50">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      
                      {/* Description */}
                      <p className="text-light-grey text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 text-xs bg-white/5 text-white/70 rounded-full border border-white/10 hover:border-red/50 hover:text-red transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">
                        <Button 
                          className="flex-1 bg-red hover:bg-red/90 text-white"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  {i % 2 === 0 ? (
                    <div className="hidden lg:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Projects CTA */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline"
            size="lg"
            className="border-red/50 text-red hover:bg-red/10 px-8"
            onClick={() => window.open('https://github.com/AVINKUMARS', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
