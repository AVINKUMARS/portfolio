import { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const education: EducationItem[] = [
    {
      degree: 'B.E. Computer Science and Engineering',
      institution: 'KCG College of Technology',
      period: '2021 - 2025',
      description: 'Pursuing a comprehensive degree in Computer Science with focus on software engineering, data structures, algorithms, and web development. Maintaining a strong academic record with hands-on project experience.',
    },
  ];

  const certifications: Certification[] = [
    {
      name: 'Full Stack Web Development',
      issuer: 'Udemy',
      date: '2024',
      link: '#',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2024',
      link: '#',
    },
    {
      name: 'Python Programming',
      issuer: 'HackerRank',
      date: '2023',
      link: '#',
    },
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      link: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="education"
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
            Learning Journey
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            EDUCATION
          </h2>
          <p className="text-light-grey max-w-2xl mx-auto">
            My academic foundation and professional certifications that fuel my expertise.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-red" />
              </div>
              <h3 className="font-display text-3xl text-white">Academic</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  variants={itemVariants}
                  className="glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-red/30 transition-all duration-500 group"
                >
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red/10 rounded-full mb-4">
                    <BookOpen className="w-4 h-4 text-red" />
                    <span className="text-sm text-red">{edu.period}</span>
                  </div>
                  
                  <h4 className="font-display text-2xl text-white mb-2 group-hover:text-red transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-white/80 font-medium mb-4">{edu.institution}</p>
                  <p className="text-light-grey text-sm leading-relaxed">
                    {edu.description}
                  </p>
                  
                  {/* Decorative */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, j) => (
                        <div 
                          key={j}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-red/30 to-red/10 border-2 border-void flex items-center justify-center"
                        >
                          <span className="text-xs text-red font-medium">{j + 1}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-light-grey">Active Student</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-red" />
              </div>
              <h3 className="font-display text-3xl text-white">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="glass p-5 rounded-xl border border-white/10 hover:border-red/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => cert.link && window.open(cert.link, '_blank')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1 group-hover:text-red transition-colors">
                        {cert.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-light-grey">
                        <span>{cert.issuer}</span>
                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="w-4 h-4 text-red" />
                    </motion.div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 glass p-6 rounded-2xl border border-white/10"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <span className="font-display text-4xl text-red block">{certifications.length}+</span>
                  <span className="text-sm text-light-grey">Certifications</span>
                </div>
                <div className="text-center">
                  <span className="font-display text-4xl text-red block">1000+</span>
                  <span className="text-sm text-light-grey">Hours Learned</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
