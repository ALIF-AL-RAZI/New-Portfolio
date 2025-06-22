"use client";

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Tweetsy Inc.",
      period: "May 2024 - Present",
      description: "As a Software Engineer at Tweetsy Inc., I develop full-stack SaaS products with responsive user interfaces and scalable backend services. I collaborate with teams to enhance user experiences, build AI-driven tools for business optimization, and integrate APIs to expand functionality and streamline workflows."
    },
    {
      title: "Moderator",
      company: "Virtual Sherpa",
      period: "February 2024 – March 2024",
      description: "Promoting constructive engagement, upholding standards, aiding users, strategizing for growth, and safeguarding the community by monitoring and managing unsuitable content."
    },
    {
      title: "Moderator",
      company: "Ecosapiens.xyz",
      period: "February 2024 – March 2024",
      description: "Ensuring positive interactions, enforcing guidelines, assisting users, collaborating on growth strategies, and maintaining a safe space by monitoring and addressing inappropriate content."
    }
  ];

  return (
    <section className="mb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Briefcase className="text-primary" size={24} />
        Job Experience
      </motion.h2>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            className="bg-card rounded-lg p-6 border border-border shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </div>
            <h4 className="text-primary font-medium mb-3">{exp.company}</h4>
            <p className="text-muted-foreground">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}