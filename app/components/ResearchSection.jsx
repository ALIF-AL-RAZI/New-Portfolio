"use client";

import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ResearchSection() {
  return (
    <section id="research" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary">Research</span>
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto bg-card rounded-lg p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">Ophthalmic Diseases Detection Using CNN</h3>
          <p className="text-muted-foreground mb-4">
            Published at the IEEE International Conference on Computational Intelligence and Communication Networks.
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">DOI: 10.1109/CICN63059.2024.10847410</span>
          </div>
          
          <p className="text-muted-foreground mb-6">ResNet-50, ResNet-18, VGG-16, and VGG-19 architectures for classification. Contributed to AI-driven solutions in early diagnostics.</p>
          
          <Link 
            href="/about" 
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1"
          >
            View More Research <ExternalLink size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}