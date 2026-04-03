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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashLink = (hash: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const navbarHeight = 80;
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
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
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-sm border-b border-white/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transition-transform group-hover:scale-105 duration-300 flex-shrink-0">
              <img 
                src={LogoImage} 
                alt="Law Office of Enoch P. Hicks Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                {settings.siteName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium mt-1">
                Justice • Integrity • Results
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
              {pageLinks.map((link) => (
                link.label === "Home" ? (
                  <button
                    key={link.label}
                    onClick={handleHomeClick}
                    className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              {sectionLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => handleHashLink(link.href, e)}
                  className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              
              <Link
                to={aboutLink.href}
                className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
              >
                {aboutLink.label}
              </Link>
            </div>
          </div>

          {/* Right Side - Contact Info & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${contact.phone}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>{contact.phone}</span>
            </a>
            <button
              onClick={(e) => handleHashLink("#contact", e)}
              className="bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-secondary border-t border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {pageLinks.map((link) => (
              link.label === "Home" ? (
                <button
                  key={link.label}
                  onClick={handleHomeClick}
                  className="block w-full text-left text-base font-medium text-white/80 hover:text-primary py-2"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-white/80 hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {sectionLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleHashLink(link.href, e)}
                className="block w-full text-left text-base font-medium text-white/80 hover:text-primary py-2"
              >
                {link.label}
              </button>
            ))}
            
            <Link
              to={aboutLink.href}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-base font-medium text-white/80 hover:text-primary py-2"
            >
              {aboutLink.label}
            </Link>
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <button
                onClick={(e) => handleHashLink("#contact", e)}
                className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-xl text-base font-semibold transition-colors"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
