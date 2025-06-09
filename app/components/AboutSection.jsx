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
              I'm a passionate Full Stack Developer with expertise in modern web technologies. 
              With a strong foundation in both frontend and backend development, I create 
              responsive, user-friendly applications that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My journey in software development began 5 years ago, and since then, I've worked 
              on various projects ranging from e-commerce platforms to data visualization tools. 
              I'm constantly learning and adapting to new technologies to stay at the forefront 
              of web development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new hiking trails, reading about 
              emerging tech trends, or experimenting with new recipes in the kitchen.
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
                  <p className="font-medium">New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:alif@example.com" className="font-medium hover:text-primary transition-colors">
                    alif@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+1234567890" className="font-medium hover:text-primary transition-colors">
                    +1 (234) 567-890
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