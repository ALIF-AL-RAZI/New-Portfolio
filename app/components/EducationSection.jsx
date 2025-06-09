"use client";

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    }
  ];

  return (
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary">Education</span>
        </motion.h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-lg p-6 border border-border shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
          
          <div className="text-center mt-8">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            >
              View Full Education History <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}