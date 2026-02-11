export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-24 pb-16 flex flex-col items-center justify-center bg-[#060608]/85">
      
      <div className="max-w-lg w-full">
        
        <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display tracking-tight uppercase leading-none">
                Get in Touch
            </h1>
            <p className="text-white/25 text-sm">
                We&apos;d love to hear from you.
            </p>
        </div>

        <div className="border-t border-white/5 pt-8">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-tech text-white/25 uppercase tracking-widest">Name</label>
                        <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" placeholder="Your name" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-tech text-white/25 uppercase tracking-widest">Email</label>
                        <input type="email" className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" placeholder="you@email.com" />
                    </div>
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-[10px] font-tech text-white/25 uppercase tracking-widest">Message</label>
                    <textarea className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body h-28 transition-all resize-none placeholder:text-white/10 text-sm" placeholder="How can we help?"></textarea>
                </div>
                
                <button className="w-full py-3.5 bg-white text-black font-bold font-display text-sm uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all">
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </main>
  );
}
