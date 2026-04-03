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
    <footer className="bg-[#0f2237] text-white py-12 md:py-20 border-t-4 border-primary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">
              {settings.siteName}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-xs font-light">
              Providing premium legal representation with justice, integrity, and exceptional results for Cobb County and surrounding areas.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-white border border-white/10 hover:border-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-primary transition-colors text-sm font-medium"
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
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors border border-white/10 group-hover:border-primary">
                  <Phone className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <a href={`tel:${contact.phone}`} className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors border border-white/10 group-hover:border-primary">
                  <Mail className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <a href={`mailto:${contact.email}`} className="text-sm font-medium text-slate-300 hover:text-primary transition-colors break-all">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0 border border-white/10 group-hover:border-primary">
                  <MapPin className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-slate-300 leading-relaxed pt-2">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </span>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-8">Office Hours</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="font-semibold text-white/80">Mon - Fri</span>
                <span className="font-light">{contact.hours.weekdays}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="font-semibold text-white/80">Saturday</span>
                <span className="font-light">{contact.hours.saturday}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span className="font-semibold text-white/80">Sunday</span>
                <span className="font-light">{contact.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-slate-400">
            {settings.copyright.replace("2025", String(currentYear))}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm font-medium text-slate-400">
              Attorney Advertising
            </p>
            <Link
              to="/admin/login"
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
