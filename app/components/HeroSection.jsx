"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Stats from "./Stats";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Software Engineer & AI Enthusiast";
  
  // Typewriter effect
  useEffect(() => {
    if (isTyping) {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setText("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isTyping]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <section id="hero" className=" flex items-center justify-center py-20 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-60 gap-12">
        
      <motion.div 
          className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-primary to-secondary opacity-20 blur-2xl animate-pulse"></div>
          <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-border">
            <Image 
              src="/images/alif.png" 
              alt="Alif" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        
        
        
        
        <motion.div 
          className=" space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-primary">Alif</span>
            </h1>
            <div className="h-8">
              <p className="text-xl md:text-2xl text-muted-foreground">
                {text}
                <span className={cn("ml-1 inline-block w-1 h-6 bg-primary", {
                  "animate-pulse": isTyping
                })}></span>
              </p>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
              Building modern web applications with a focus on user experience and performance.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/resume/ALIF_AL_RAZI(CV).pdf" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
            >
              <FileText size={18} />
              View Resume
            </Link>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-medium transition-colors"
            >
              <Mail size={18} />
              Contact Me
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </motion.div>
        
        
      </div>
      
    </section>
    <Stats/>
    </div>
    
  );
}