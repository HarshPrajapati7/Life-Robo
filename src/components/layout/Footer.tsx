import Link from "next/link";
import { Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

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
    <footer className="w-full bg-[#060608] border-t border-white/5 pt-16 pb-10 font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/">
              <h3 className="text-lg font-black font-display tracking-[0.15em] leading-none">
                <span className="text-white">LIFE</span>
                <span className="text-white/40 ml-1.5">ROBO</span>
              </h3>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Learn and Innovation in the Field of Engineering. Shaping the future of robotics at the <a href="https://www.lkouniv.ac.in/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline underline-offset-4 decoration-white/10 transition-colors">University of Lucknow</a>.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 border border-white/5 flex items-center justify-center text-white/25 hover:text-white hover:border-white/15 transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/50 font-tech font-bold uppercase tracking-widest mb-5 text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/25 hover:text-white/60 text-sm font-tech uppercase tracking-wider transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/50 font-tech font-bold uppercase tracking-widest mb-5 text-[11px]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/25">
                <Mail size={16} className="mt-0.5" />
                <span className="text-sm font-tech tracking-wider break-all">club@liferobo.uni.edu</span>
              </li>
              <li className="flex items-start gap-3 text-white/25">
                <MapPin size={16} className="mt-0.5" />
                <span className="text-sm font-tech tracking-wide leading-relaxed">
                  Faculty of Engineering,<br />
                  University of Lucknow,<br />
                  Lucknow, UP, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/20 font-tech uppercase tracking-wider">
            © {currentYear} LIFE ROBO
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[10px] text-white/15 hover:text-white/40 uppercase tracking-widest transition-colors font-tech">Privacy</Link>
            <Link href="/terms" className="text-[10px] text-white/15 hover:text-white/40 uppercase tracking-widest transition-colors font-tech">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
