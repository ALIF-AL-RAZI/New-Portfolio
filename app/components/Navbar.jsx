"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect for floating header and active section
  useEffect(() => {
    const handleScroll = () => {
      // Floating header effect
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection (only on home page)
      if (pathname === "/") {
        const sections = ["about", "projects", "skills", "research", "education", "blog", "contact"];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });

        setActiveSection(currentSection || "");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Navigate to home page and scroll to section
  const navigateToSection = (sectionId) => {
    setIsOpen(false);
    
    if (pathname === "/") {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home with hash
      router.push(`/#${sectionId}`);
    }
  };

  // Handle scroll to section after navigation (for hash URLs)
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          ALIF AL RAZI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigateToSection("about")}
            className={cn(
              "text-foreground hover:text-primary transition-colors relative",
              "after:content-[''] after:absolute after:left-0 after:bottom-[-4px]",
              "after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              activeSection === "about"
                ? "text-primary after:w-full"
                : "after:w-0 hover:after:w-full"
            )}
          >
            About
          </button>
          <button
            onClick={() => navigateToSection("projects")}
            className={cn(
              "text-foreground hover:text-primary transition-colors relative",
              "after:content-[''] after:absolute after:left-0 after:bottom-[-4px]",
              "after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              activeSection === "projects"
                ? "text-primary after:w-full"
                : "after:w-0 hover:after:w-full"
            )}
          >
            Projects
          </button>
          <button
            onClick={() => navigateToSection("skills")}
            className={cn(
              "text-foreground hover:text-primary transition-colors relative",
              "after:content-[''] after:absolute after:left-0 after:bottom-[-4px]",
              "after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              activeSection === "skills"
                ? "text-primary after:w-full"
                : "after:w-0 hover:after:w-full"
            )}
          >
            Skills
          </button>
          <button
            onClick={() => navigateToSection("blog")}
            className={cn(
              "text-foreground hover:text-primary transition-colors relative",
              "after:content-[''] after:absolute after:left-0 after:bottom-[-4px]",
              "after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              activeSection === "blog"
                ? "text-primary after:w-full"
                : "after:w-0 hover:after:w-full"
            )}
          >
            Blog
          </button>
          <button
            onClick={() => navigateToSection("contact")}
            className={cn(
              "text-foreground hover:text-primary transition-colors relative",
              "after:content-[''] after:absolute after:left-0 after:bottom-[-4px]",
              "after:h-[2px] after:bg-primary after:transition-all after:duration-300",
              activeSection === "contact"
                ? "text-primary after:w-full"
                : "after:w-0 hover:after:w-full"
            )}
          >
            Contact
          </button>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "p-2 rounded-md",
              theme === "light" ? "bg-secondary/10 text-primary" : "text-foreground"
            )}
            aria-label="Light mode"
          >
            <Sun size={18} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "p-2 rounded-md",
              theme === "dark" ? "bg-secondary/10 text-primary" : "text-foreground"
            )}
            aria-label="Dark mode"
          >
            <Moon size={18} />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "p-2 rounded-md",
              theme === "system" ? "bg-secondary/10 text-primary" : "text-foreground"
            )}
            aria-label="System theme"
          >
            <Monitor size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-4 px-4 flex flex-col space-y-4 border-t border-border">
          <button
            onClick={() => navigateToSection("about")}
            className="text-foreground hover:text-primary transition-colors py-2"
          >
            About
          </button>
          <button
            onClick={() => navigateToSection("projects")}
            className="text-foreground hover:text-primary transition-colors py-2"
          >
            Projects
          </button>
          <button
            onClick={() => navigateToSection("skills")}
            className="text-foreground hover:text-primary transition-colors py-2"
          >
            Skills
          </button>
          <button
            onClick={() => navigateToSection("blog")}
            className="text-foreground hover:text-primary transition-colors py-2"
          >
            Blog
          </button>
          <button
            onClick={() => navigateToSection("contact")}
            className="text-foreground hover:text-primary transition-colors py-2"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}