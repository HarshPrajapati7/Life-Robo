import { Mail, MapPin, Instagram, Linkedin, Twitter, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/liferobo.foet.lu/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/roboticsclublu/" },
    { name: "X", icon: Twitter, href: "https://x.com/liferobo_foet/" },
  ];

  return (
    <main className="min-h-screen p-8 md:p-24 pt-32 flex items-center justify-center relative overflow-hidden">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Column: Contact Info */}
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-bold text-white mb-4 font-display tracking-widest uppercase">Contact <span className="text-cyber-cyan">Us</span></h1>
                <p className="text-gray-400 font-body text-lg max-w-md">
                    Have questions about the club? Want to collaborate or join? Reach out to our command center.
                </p>
            </div>

            <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan bg-cyber-cyan/5 group-hover:border-cyber-cyan transition-colors">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-display uppercase tracking-wider mb-1">Email Relay</h4>
                        <p className="text-cyber-cyan font-tech text-sm tracking-widest break-all">club@liferobo.uni.edu</p>
                    </div>
                </div>

                <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan bg-cyber-cyan/5 group-hover:border-cyber-cyan transition-colors">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-display uppercase tracking-wider mb-1">Command Center</h4>
                        <p className="text-gray-400 font-tech text-sm tracking-wide uppercase leading-relaxed max-w-xs">
                            Faculty of Engineering,<br />
                            University of Lucknow,<br />
                            Lucknow, UP, India
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-8">
                <h4 className="text-white font-display uppercase tracking-widest mb-6 text-sm flex items-center gap-2">
                    <div className="w-1 h-3 bg-cyber-cyan"></div>
                    Follow Frequency
                </h4>
                <div className="flex gap-4">
                    {socialLinks.map((social) => (
                        <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan bg-white/5 transition-all"
                        aria-label={social.name}
                        >
                        <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Form */}
        <div className="glass-panel p-8 border border-white/10 relative">
            <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="text-cyber-cyan" size={20} />
                <h3 className="text-xl font-bold text-white font-display tracking-widest uppercase">Secure Message</h3>
            </div>
            
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-cyber-cyan font-tech uppercase tracking-wider">Ident Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-colors" placeholder="OPERATOR" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-cyber-cyan font-tech uppercase tracking-wider">Email Route</label>
                        <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-colors" placeholder="user@net.com" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-cyber-cyan font-tech uppercase tracking-wider">Transmission Payload</label>
                    <textarea className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body h-40 transition-colors resize-none" placeholder="Enter message..."></textarea>
                </div>
                
                <button className="w-full bg-cyber-cyan text-black py-4 font-bold transition-all uppercase tracking-widest relative overflow-hidden group">
                    <span className="relative z-10 text-sm font-display">Execute Send</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-tech uppercase tracking-[0.2em] text-center">
                    Encryption: ACTIVE | Priority: HIGH
                </p>
            </div>
        </div>
      </div>
    </main>
  );
}
