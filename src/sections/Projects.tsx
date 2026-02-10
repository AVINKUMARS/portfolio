import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Layers, MessageSquare, QrCode, LayoutDashboard } from 'lucide-react';
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
  const [activeProject, setActiveProject] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Realtime Chat App',
      description: 'A full-featured real-time messaging platform with JWT authentication, media upload capabilities, and WebSocket-powered instant messaging. Features include group chats, typing indicators, and message persistence.',
      image: '/project-chat.jpg',
      technologies: ['React', 'Tailwind CSS', 'ShadCN', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      icon: MessageSquare,
      color: '#3b82f6',
    },
    {
      id: 2,
      title: 'QR Code Generator',
      description: 'An elegant QR code generation tool that creates instant QR codes for links and text. Features customizable designs, download options, and batch generation capabilities.',
      image: '/project-qr.jpg',
      technologies: ['React', 'Node.js', 'QR API', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      icon: QrCode,
      color: '#ef4444',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'A comprehensive analytics dashboard with real-time data visualization, interactive charts, and customizable widgets. Built for monitoring key metrics and making data-driven decisions.',
      image: '/project-dashboard.jpg',
      technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      icon: LayoutDashboard,
      color: '#10b981',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards fan out animation
      gsap.fromTo('.project-card',
        { y: 100, opacity: 0, rotateX: 30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      <div className="absolute inset-0 bg-gradient-to-b from-void via-dark-grey/30 to-void" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red/5 rounded-full blur-[120px]" />
      
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
        
        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Project Cards Stack */}
          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <motion.div 
                  className={`
                    relative glass rounded-2xl overflow-hidden cursor-pointer
                    border transition-all duration-500
                    ${activeProject === i ? 'border-red/50' : 'border-white/10'}
                  `}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setIsHovered(project.id)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  {/* Hologram Scanline Effect */}
                  <AnimatePresence>
                    {isHovered === project.id && (
                      <motion.div
                        initial={{ top: '-100%' }}
                        animate={{ top: '100%' }}
                        exit={{ top: '200%' }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red to-transparent z-20"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered === project.id ? 1.05 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div 
                      className="absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <project.icon className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-white mb-2 group-hover:text-red transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-light-grey text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs text-white/40">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Right: Featured Project Detail */}
          <div className="hidden lg:block">
            <motion.div 
              className="sticky top-24"
              key={activeProject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${projects[activeProject].color}20` }}
                  >
                    {(() => {
                      const Icon = projects[activeProject].icon;
                      return <Icon className="w-7 h-7" style={{ color: projects[activeProject].color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-white">
                      {projects[activeProject].title}
                    </h3>
                    <span className="text-light-grey text-sm">Featured Project</span>
                  </div>
                </div>
                
                {/* Large Image */}
                <div className="relative rounded-xl overflow-hidden mb-6 aspect-video">
                  <img 
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
                </div>
                
                {/* Full Description */}
                <p className="text-light-grey leading-relaxed mb-6">
                  {projects[activeProject].description}
                </p>
                
                {/* All Technologies */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-red" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1.5 text-sm bg-white/5 text-white/80 rounded-full border border-white/10 hover:border-red/50 hover:text-red transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-red hover:bg-red/90 text-white"
                    onClick={() => window.open(projects[activeProject].liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(projects[activeProject].githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* View All Projects CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline"
            size="lg"
            className="border-red/50 text-red hover:bg-red/10 px-8"
            onClick={() => window.open('https://github.com', '_blank')}
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
