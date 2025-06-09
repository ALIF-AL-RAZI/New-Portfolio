"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ChevronRight } from 'lucide-react';

export default function BlogList() {
  const [filter, setFilter] = useState('all');
  
  const blogPosts = [
    {
      id: 1,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS framework.",
      date: "June 15, 2024",
      readTime: "5 min read",
      category: "frontend",
      image: "/images/blog-tailwind.jpg"
    },
    {
      id: 2,
      title: "Getting Started with Next.js 14",
      excerpt: "Explore the new features in Next.js 14 and how to leverage them in your projects.",
      date: "May 28, 2024",
      readTime: "8 min read",
      category: "frontend",
      image: "/images/blog-nextjs.jpg"
    },
    {
      id: 3,
      title: "Introduction to Machine Learning with TensorFlow",
      excerpt: "A beginner's guide to understanding and implementing machine learning models with TensorFlow.",
      date: "April 10, 2024",
      readTime: "12 min read",
      category: "ai",
      image: "/images/blog-ml.jpg"
    },
    {
      id: 4,
      title: "RESTful API Design Best Practices",
      excerpt: "Learn the principles and best practices for designing clean, efficient RESTful APIs.",
      date: "March 22, 2024",
      readTime: "7 min read",
      category: "backend",
      image: "/images/blog-api.jpg"
    },
    {
      id: 5,
      title: "State Management in React with Context API",
      excerpt: "Discover how to effectively manage state in React applications using the Context API.",
      date: "February 15, 2024",
      readTime: "6 min read",
      category: "frontend",
      image: "/images/blog-react.jpg"
    },
    {
      id: 6,
      title: "Deploying Node.js Applications with Docker",
      excerpt: "A step-by-step guide to containerizing and deploying Node.js applications using Docker.",
      date: "January 30, 2024",
      readTime: "9 min read",
      category: "backend",
      image: "/images/blog-docker.jpg"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'ai', name: 'AI & ML' }
  ];

  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category.id 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <div className="absolute bottom-3 left-3 z-20">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>
              </div>
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <Link 
                href={`/blog/${post.id}`} 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Read More <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found in this category.</p>
        </div>
      )}
    </div>
  );
}