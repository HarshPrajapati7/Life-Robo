import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/liferobo.foet.lu/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/roboticsclublu/" },
    { name: "X", icon: Twitter, href: "https://x.com/liferobo_foet/" },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden font-body">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6 group">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 bg-black border border-white/10 tech-border-corner p-1 overflow-hidden transition-all group-hover:border-cyber-cyan/50">
                <Image src="/images/logo.png" alt="Life Robo Logo" fill sizes="56px" className="object-contain p-1.5" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display tracking-widest leading-none transition-colors group-hover:text-neon-cyan">
                LIFE ROBO
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs uppercase font-tech tracking-wider">
              Learn and Innovation in the Field of Engineering. Shaping the future of robotics at the <a href="https://www.lkouniv.ac.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyber-cyan underline underline-offset-4 decoration-cyber-cyan/30 transition-colors">University of Lucknow</a>.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6 text-sm flex items-center gap-2">
              <div className="w-1 h-3 bg-cyber-cyan"></div>
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyber-cyan text-sm uppercase font-tech tracking-widest transition-colors flex items-center group"
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-widest mb-6 text-sm flex items-center gap-2">
              <div className="w-1 h-3 bg-cyber-cyan"></div>
              Relay Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group text-gray-400">
                <Mail size={18} className="text-cyber-cyan mt-0.5" />
                <span className="text-sm font-tech tracking-wider break-all">club@liferobo.uni.edu</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-cyber-cyan mt-0.5" />
                <span className="text-sm font-tech tracking-wide uppercase leading-relaxed">
                  Faculty of Engineering,<br />
                  University of Lucknow,<br />
                  Lucknow, UP, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-tech uppercase tracking-[0.2em]">
            © {currentYear} LIFE ROBO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-tech">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-tech">Terms of Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
