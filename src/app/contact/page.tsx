import { MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8 md:p-24 pt-32 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      
      <div className="max-w-2xl w-full relative z-10">
        
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tighter uppercase leading-none">
                Contact <span className="text-cyber-cyan">Us</span>
            </h1>
            <p className="text-gray-500 font-light text-sm max-w-sm mx-auto uppercase tracking-widest font-tech">
                We'd love to hear from you
            </p>
        </div>

        {/* Form Container */}
        <div className="p-10 border border-white/5 bg-white/[0.02] backdrop-blur-sm relative">
            <div className="flex items-center gap-3 mb-10 opacity-50">
                <MessageSquare className="text-cyber-cyan" size={16} />
                <span className="text-[10px] font-tech text-white uppercase tracking-[0.4em]">Message Form</span>
            </div>
            
            <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">Name</label>
                        <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-all placeholder:text-white/20" placeholder="Your Name" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">Email</label>
                        <input type="email" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-all placeholder:text-white/20" placeholder="Your Email" />
                    </div>
                </div>
                
                <div className="space-y-3">
                    <label className="text-[10px] font-tech text-gray-500 uppercase tracking-widest">Message</label>
                    <textarea className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body h-32 transition-all resize-none placeholder:text-white/20" placeholder="How can we help?"></textarea>
                </div>
                
                <button className="w-full group relative overflow-hidden h-14 border border-cyber-cyan hover:bg-cyber-cyan transition-colors duration-500">
                    <span className="relative z-10 text-xs font-tech font-bold text-cyber-cyan group-hover:text-black uppercase tracking-[0.3em]">
                        Send Message
                    </span>
                    <div className="absolute inset-0 bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
            </form>

            <div className="mt-12 pt-6 border-t border-white/5">
                <p className="text-[9px] text-gray-600 font-tech uppercase tracking-[0.3em] text-center">
                    Simple and Fast
                </p>
            </div>
        </div>
      </div>

      {/* Background Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    </main>
  );
}
