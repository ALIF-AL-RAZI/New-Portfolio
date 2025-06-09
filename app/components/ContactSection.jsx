"use client";

import { useState } from "react";
import { Github, Linkedin, Code } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    status: "", // success, error, or empty
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For actual implementation, you would use EmailJS or Formspree here
      // Example with EmailJS:
      // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID');
      
      setFormStatus({
        status: "success",
        message: "Message sent successfully! I'll get back to you soon."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="text-primary">Touch</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-card rounded-lg p-6 shadow-sm border border-border"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              {formStatus.status && (
                <motion.div 
                  className={`mt-4 p-4 rounded-md ${formStatus.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
            
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed">
              Feel free to reach out if you have any questions or want to work together. 
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="https://github.com/ALIF-AL-RAZI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-md hover:bg-card transition-colors border border-transparent hover:border-border"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Github className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm text-muted-foreground">github.com/ALIF-AL-RAZI</p>
                </div>
              </Link>
              
              <Link 
                href="https://linkedin.com/in/alif-al-razi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-md hover:bg-card transition-colors border border-transparent hover:border-border"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Linkedin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground">linkedin.com/in/alif-al-razi</p>
                </div>
              </Link>
              
              <Link 
                href="https://hackerrank.com/alifalrazi1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-md hover:bg-card transition-colors border border-transparent hover:border-border"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Code className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">HackerRank</h4>
                  <p className="text-sm text-muted-foreground">hackerrank.com/alifalrazi1</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}