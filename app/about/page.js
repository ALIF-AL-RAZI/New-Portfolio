import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EducationSection from './components/EducationSection';
import ResearchSection from './components/ResearchSection';
import ExperienceSection from './components/ExperienceSection';

export const metadata = {
  title: 'About - Alif Al Razi',
  description: 'Learn more about Alif Al Razi - education, research, and professional experience',
};

export default function AboutPage() {
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
        
        <h1 className="text-4xl font-bold mb-12">About <span className="text-primary">Me</span></h1>
        
        <ExperienceSection />
        <ResearchSection />
        <EducationSection />
      </div>
    </div>
  );
}