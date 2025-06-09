"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Project Card Component
function ProjectCard({ project, onClick, index }) {
  return (
    <motion.div 
      className="group relative bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white font-medium">{project.shortDescription}</p>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
    </motion.div>
  );
}

// Project Modal Component
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-card border border-border rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <div className="flex gap-2">
                {project.github && (
                  <Link 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="GitHub repository"
                  >
                    <Github size={20} />
                  </Link>
                )}
                {project.liveDemo && (
                  <Link 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={20} />
                  </Link>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">{project.description}</p>
              
              {project.features && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main Projects Section Component
export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Handler functions
  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };
  
  const handleCloseProject = () => {
    setSelectedProject(null);
  };
  
  const projects = [
    {
      id: 1, // Added missing id
      title: "E-Commerce Platform",
      shortDescription: "A full-stack e-commerce solution",
      description: "A comprehensive e-commerce platform with product management, shopping cart, user authentication, and payment processing capabilities.",
      image: "/images/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/ecommerce-platform",
      liveDemo: "https://ecommerce-demo.example.com",
      features: [
        "User authentication and profile management",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment processing with Stripe",
        "Order history and tracking"
      ]
    },
    {
      id: 2, // Added missing id
      title: "Task Management App",
      shortDescription: "Organize your tasks efficiently",
      description: "A task management application that helps users organize their work with features like task categorization, due dates, and progress tracking.",
      image: "/images/project2.jpg",
      technologies: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
      github: "https://github.com/yourusername/task-manager",
      liveDemo: "https://task-manager-demo.example.com",
      features: [
        "Task creation and editing",
        "Categories and tags for organization",
        "Due date reminders",
        "Progress tracking and statistics",
        "Collaborative features for team tasks"
      ]
    },
    {
      id: 3, // Added missing id
      title: "Weather Dashboard",
      shortDescription: "Real-time weather information",
      description: "A weather dashboard that provides real-time weather information for locations worldwide, with features like forecasts, historical data, and weather maps.",
      image: "/images/project3.jpg",
      technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation API"],
      github: "https://github.com/yourusername/weather-dashboard",
      liveDemo: "https://weather-dashboard-demo.example.com",
      features: [
        "Current weather conditions",
        "5-day forecast",
        "Historical weather data",
        "Interactive weather maps",
        "Location-based weather using geolocation"
      ]
    },
    {
      id: 4, // Added missing id
      title: "Portfolio Website",
      shortDescription: "Showcase of my work and skills",
      description: "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects, skills, and professional experience.",
      image: "/images/project4.jpg",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      github: "https://github.com/yourusername/portfolio",
      liveDemo: "https://yourusername.dev",
      features: [
        "Responsive design for all devices",
        "Dark/light mode toggle",
        "Project showcase with detailed views",
        "Skills and experience sections",
        "Contact form for inquiries"
      ]
    },
    {
      id: 5, // Added missing id
      title: "AI Image Generator",
      shortDescription: "Generate images with AI",
      description: "An application that uses AI to generate images based on text prompts, leveraging the latest in machine learning technology.",
      image: "/images/project5.jpg",
      technologies: ["Python", "TensorFlow", "React", "Flask"],
      github: "https://github.com/yourusername/ai-image-generator",
      liveDemo: "https://ai-image-demo.example.com",
      features: [
        "Text-to-image generation",
        "Style transfer capabilities",
        "Image editing and enhancement",
        "Gallery of generated images",
        "User accounts to save favorites"
      ]
    },
    {
      id: 6, // Added missing id
      title: "Fitness Tracker",
      shortDescription: "Track your fitness journey",
      description: "A fitness tracking application that helps users monitor their workouts, nutrition, and progress towards fitness goals.",
      image: "/images/project6.jpg",
      technologies: ["React Native", "Firebase", "HealthKit API", "Google Fit API"],
      github: "https://github.com/yourusername/fitness-tracker",
      liveDemo: "https://fitness-tracker-demo.example.com",
      features: [
        "Workout logging and tracking",
        "Nutrition and calorie tracking",
        "Progress visualization with charts",
        "Goal setting and achievement tracking",
        "Integration with health platforms"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 flex flex-col items-center gap-10">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary">Projects</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleOpenProject}
              index={index}
            />
          ))}
        </div>
        
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseProject} />
        )}
        
      </div>
      <Link href="/projects" >
              <Button>
                See More <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
    </section>
  );
}