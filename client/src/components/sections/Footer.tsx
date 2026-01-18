import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
import type { ContactContent, SiteSettings } from "@/lib/api";

interface FooterProps {
  contact: ContactContent;
  settings: SiteSettings;
}

export function Footer({ contact, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: contact.social.facebook, label: "Facebook" },
    { icon: Linkedin, href: contact.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: contact.social.twitter, label: "Twitter" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/#practice-areas" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative bg-secondary text-white py-24 overflow-hidden border-t-4 border-primary">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-6 tracking-tight uppercase">
              {settings.siteName}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-xs">
              Providing premium legal representation with justice, integrity, and exceptional results for Cobb County and surrounding areas.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <a href={`tel:${contact.phone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <a href={`mailto:${contact.email}`} className="text-sm text-gray-300 hover:text-white transition-colors break-all">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors mt-1">
                  <MapPin className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <span className="text-sm text-gray-300">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </span>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-8">Office Hours</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-[10px] uppercase tracking-widest">Mon - Fri</span>
                <span>{contact.hours.weekdays}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-[10px] uppercase tracking-widest">Saturday</span>
                <span>{contact.hours.saturday}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-[10px] uppercase tracking-widest">Sunday</span>
                <span>{contact.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            {settings.copyright.replace("2025", String(currentYear))}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Attorney Advertising
            </p>
            <Link
              to="/admin/login"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-gray-400 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
