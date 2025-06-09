"use client";

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function EducationSection() {
  const education = [
    {
      degree: "Bachelors of Science in Computer Science and Engineering",
      institution: "North South University",
      period: "2020-2024",
      result: "CGPA 3.51 [On a scale of 4]"
    },
    {
      degree: "Higher Secondary School Certificate (HSC)",
      institution: "Adamjee Cantonment College",
      period: "2016-2018",
      result: "GPA 5 [On a scale of 5]"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "BAF Shaheen College, Kurmitola",
      period: "2014-2016",
      result: "GPA 5 [On a scale of 5]"
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
        <GraduationCap className="text-primary" size={24} />
        Education
      </motion.h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div 
            key={index}
            className="bg-card rounded-lg p-6 border border-border shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
            <h4 className="text-primary font-medium mb-3">{edu.institution}</h4>
            <p className="text-muted-foreground">Result: {edu.result}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}