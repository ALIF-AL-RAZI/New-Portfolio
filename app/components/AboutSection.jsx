"use client";

import { Download, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold">Personal Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
            Enthusiastic React Full Stack Developer with hands-on experience in developing web
applications using React.js, Node.js, and MongoDB. Focused on modern web technologies,
UI/UX design principles, and applications in AI and machine learning. 
            </p>
            <p className="text-muted-foreground leading-relaxed">
            Proficient in
building intelligent solutions using OpenAI APIs, LangChain, RAG pipelines, and
popular ML frameworks like TensorFlow, PyTorch, and scikit-learn. Experienced in
developing end-to-end AI applications, including large language models (LLMs) and
vector databases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            Eager to contribute to innovative projects, leveraging both full-stack
development and machine learning expertise to create impactful solutions in a dynamic team
environment.
            </p>
            <Link href="/about">
              <Button>
                Know More <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-card rounded-lg p-6 shadow-sm border border-border"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:alifalrazi1@gmail.com" className="font-medium hover:text-primary transition-colors">
                  alifalrazi1@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+8801872792494" className="font-medium hover:text-primary transition-colors">
                  +8801872792494
                  </a>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border">
                <Link 
                  href="/resume/ALIF_AL_RAZI(CV).pdf" 
                  target="_blank"
                  className="inline-flex items-center gap-2 w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  <Download size={18} />
                  Download Resume
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}