import { events, slugify } from "@/lib/events-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink, User, Users } from "lucide-react";

export function generateStaticParams() {
  return events.map((event) => ({
    slug: slugify(event.title),
  }));
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => slugify(e.title) === params.slug);

  if (!event) {
    notFound();
  }

  const { title, image, category, date, description, ...details } = event;

  return (
    <main className="min-h-screen bg-[#060608] relative overflow-hidden pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Button */}
        <Link 
            href="/events" 
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors uppercase tracking-widest font-tech text-xs mb-10 md:mb-16 group"
        >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} /> 
            </div>
            Back to Timeline
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Image Area */}
            <div className="w-full lg:w-5/12 shrink-0 sticky top-32">
                <div className="w-full relative rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20 border border-white/10 group bg-[#0a0a0c]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                    
                    {/* The image is contained, not cropped */}
                    <Image 
                        src={image}
                        alt={title}
                        width={800}
                        height={1000}
                        priority
                        className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                </div>
            </div>

            {/* Right Column: Content Area */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
                
                {/* Header Labels */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1.5 border border-cyan-500/30 text-[10px] font-tech font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 rounded-sm">
                        {category}
                    </span>
                    <span className="flex items-center gap-2 text-white/60 text-[10px] font-tech uppercase tracking-widest bg-white/5 px-3 py-1.5 border border-white/5 rounded-sm">
                        <Calendar size={12} /> {date}
                    </span>
                    {details.status && (
                        <span className="flex items-center gap-2 text-white/60 text-[10px] font-tech uppercase tracking-widest bg-white/5 px-3 py-1.5 border border-white/5 rounded-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {details.status}
                        </span>
                    )}
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-white mb-10 uppercase tracking-tighter leading-[0.9]">
                    {title}
                </h1>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {details.time && (
                        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg flex items-start gap-4 hover:border-white/10 transition-colors">
                            <div className="p-2.5 bg-white/5 rounded-md text-cyan-400">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="text-white/40 font-tech text-[10px] uppercase tracking-widest mb-1.5">Schedule</p>
                                <p className="text-white/90 font-body text-sm font-medium">{details.time}</p>
                            </div>
                        </div>
                    )}
                    {details.venue && (
                        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg flex items-start gap-4 hover:border-white/10 transition-colors">
                            <div className="p-2.5 bg-white/5 rounded-md text-cyan-400">
                                <MapPin size={16} />
                            </div>
                            <div>
                                <p className="text-white/40 font-tech text-[10px] uppercase tracking-widest mb-1.5">Location</p>
                                <p className="text-white/90 font-body text-sm font-medium">{details.venue}</p>
                            </div>
                        </div>
                    )}
                    {details.chiefGuest && (
                        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg flex items-start gap-4 hover:border-white/10 transition-colors md:col-span-2">
                            <div className="p-2.5 bg-white/5 rounded-md text-[#b49852]">
                                <User size={16} />
                            </div>
                            <div>
                                <p className="text-white/40 font-tech text-[10px] uppercase tracking-widest mb-1.5">Chief Guest</p>
                                <p className="text-white/90 font-body text-sm font-medium leading-relaxed">{details.chiefGuest}</p>
                            </div>
                        </div>
                    )}
                    {details.coordinators && (
                        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-lg flex items-start gap-4 hover:border-white/10 transition-colors md:col-span-2">
                            <div className="p-2.5 bg-white/5 rounded-md text-green-400">
                                <Users size={16} />
                            </div>
                            <div>
                                <p className="text-white/40 font-tech text-[10px] uppercase tracking-widest mb-1.5">Event Coordinators</p>
                                <p className="text-white/90 font-body text-sm font-medium">{details.coordinators}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-12" />

                {/* Description Body */}
                <div className="space-y-6 mb-12">
                    <h3 className="text-sm font-bold font-tech text-white uppercase tracking-widest">
                        About The Event
                    </h3>
                    <div className="prose prose-invert prose-p:text-white/60 prose-p:font-body prose-p:leading-relaxed max-w-none">
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-body whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Call to action */}
                {details.registrationLink && (
                    <div className="mt-4">
                        <a 
                            href={details.registrationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 py-4 px-10 bg-white text-black font-display font-black uppercase tracking-widest hover:bg-cyan-50 hover:text-cyan-950 transition-all rounded-sm shadow-xl shadow-cyan-900/20"
                        >
                            Register Now <ExternalLink size={16} className="-mt-0.5" />
                        </a>
                    </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
