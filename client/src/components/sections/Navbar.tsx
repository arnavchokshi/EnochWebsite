import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import LogoImage from "@/assets/ChatGPT Image Jan 18, 2026, 01_33_42 AM.png";
import type { ContactContent, SiteSettings } from "@/lib/api";

interface NavbarProps {
  contact: ContactContent;
  settings: SiteSettings;
}

export function Navbar({ contact, settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashLink = (hash: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const navbarHeight = 80; // h-20 = 80px
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const pageLinks = [
    { label: "Home", href: "/", type: "page" as const },
  ];
  
  const sectionLinks = [
    { label: "Practice Areas", href: "#practice-areas", type: "section" as const },
    { label: "How It Works", href: "#how-it-works", type: "section" as const },
    { label: "Contact", href: "#contact", type: "section" as const },
  ];
  
  const aboutLink = { label: "About", href: "/about", type: "page" as const };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
          : "bg-white/90 backdrop-blur-sm border-b"
      }`}
    >
      {/* Main Nav - Single Row */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transition-transform group-hover:scale-110 duration-300 flex-shrink-0">
              <img 
                src={LogoImage} 
                alt="Law Office of Enoch P. Hicks Logo" 
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-secondary leading-tight uppercase">
                {settings.siteName.split(' ').slice(0, 3).join(' ')}
              </span>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-secondary leading-tight uppercase -mt-1">
                {settings.siteName.split(' ').slice(3).join(' ')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold mt-0.5">
                Justice . Integrity . Results
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {/* Page Links */}
            {pageLinks.map((link) => (
              link.label === "Home" ? (
                <button
                  key={link.label}
                  onClick={handleHomeClick}
                  className="text-xs uppercase tracking-[0.2em] font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-bold text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Separator */}
            <div className="h-6 w-px bg-gray-300"></div>
            
            {/* Section Links */}
            {sectionLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleHashLink(link.href, e)}
                className="text-xs uppercase tracking-[0.2em] font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            
            {/* Separator */}
            <div className="h-6 w-px bg-gray-300"></div>
            
            {/* About Link - Styled Differently */}
            <Link
              to={aboutLink.href}
              className="text-xs uppercase tracking-[0.2em] font-bold text-primary border border-primary/30 px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300"
            >
              {aboutLink.label}
            </Link>
          </div>

          {/* Right Side - Contact Info & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden lg:inline">{contact.phone}</span>
            </a>
            <button
              onClick={(e) => handleHashLink("#contact", e)}
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-none border-2 font-bold uppercase tracking-widest text-[10px] px-6 py-5 transition-all duration-300"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-secondary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

          {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-8 space-y-6">
            {/* Page Links */}
            {pageLinks.map((link) => (
              link.label === "Home" ? (
                <button
                  key={link.label}
                  onClick={handleHomeClick}
                  className="block w-full text-left text-sm uppercase tracking-widest font-bold text-secondary hover:text-primary"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm uppercase tracking-widest font-bold text-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* Separator */}
            <div className="h-px w-full bg-gray-200 my-2"></div>
            
            {/* Section Links */}
            {sectionLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleHashLink(link.href, e)}
                className="block w-full text-left text-sm uppercase tracking-widest font-bold text-secondary hover:text-primary"
              >
                {link.label}
              </button>
            ))}
            
            {/* Separator */}
            <div className="h-px w-full bg-gray-200 my-2"></div>
            
            {/* About Link - Styled Differently */}
            <Link
              to={aboutLink.href}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-sm uppercase tracking-widest font-bold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              {aboutLink.label}
            </Link>
            
            <button
              onClick={(e) => handleHashLink("#contact", e)}
              className="block w-full py-4 bg-primary text-white text-center font-bold uppercase tracking-widest text-xs"
            >
              Free Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
