"use client";

import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function ResearchSection() {
  return (
    <section className="mb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen className="text-primary" size={24} />
        Research Experience
      </motion.h2>
      
      <motion.div 
        className="bg-card rounded-lg p-6 border border-border shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2">Ophthalmic Diseases Detection Using CNN</h3>
        <p className="text-muted-foreground mb-4">
          Published at the IEEE International Conference on Computational Intelligence and Communication Networks.
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">DOI: 10.1109/CICN63059.2024.10847410</span>
          <a 
            href="https://doi.org/10.1109/CICN63059.2024.10847410" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm"
          >
            View Publication <ExternalLink size={14} />
          </a>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">ResNet-50, ResNet-18, VGG-16, and VGG-19 architectures for classification.</p>
          <p className="text-muted-foreground">Contributed to AI-driven solutions in early diagnostics.</p>
        </div>
      </motion.div>
    </section>
  );
}