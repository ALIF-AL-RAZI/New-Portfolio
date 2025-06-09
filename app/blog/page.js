import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogList from './components/BlogList';

export const metadata = {
  title: 'Blog - Alif Al Razi',
  description: 'Read my latest thoughts, tutorials, and insights on software development, AI, and technology',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-12">My <span className="text-primary">Blog</span></h1>
        
        <BlogList />
      </div>
    </div>
  );
}