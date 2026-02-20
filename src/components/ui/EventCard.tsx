import NextLink from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight } from "lucide-react";
import { slugify } from "@/lib/events-data";

interface EventData {
    title: string;
    date: string;
    category: string;
    description: string;
    image: string;
    status?: string;
    color?: string;
    // For preview data compatibility
    id?: number | string;
}

interface EventCardProps {
    event: EventData;
    index: number;
    onViewDetails?: () => void;
    isPreview?: boolean;
}

export default function EventCard({ event, index, onViewDetails, isPreview = false }: EventCardProps) {
    const colorMap = {
        'cyber-cyan': {
            border: 'border-cyber-cyan',
            text: 'text-cyber-cyan',
            bg: 'bg-cyber-cyan',
            bg20: 'bg-cyber-cyan/20'
        },
        'cyber-green': {
            border: 'border-cyber-green',
            text: 'text-cyber-green',
            bg: 'bg-cyber-green',
            bg20: 'bg-cyber-green/20'
        },
        'cyber-yellow': {
            border: 'border-cyber-yellow',
            text: 'text-cyber-yellow',
            bg: 'bg-cyber-yellow',
            bg20: 'bg-cyber-yellow/20'
        }
    };
    
    // Default to cyan if not specified
    const colors = colorMap[(event.color as keyof typeof colorMap) || 'cyber-cyan'] || colorMap['cyber-cyan'];

    return (
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center group w-full`}>
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative">
                <div className={`absolute -inset-4 ${colors.bg20} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative h-[250px] md:h-[300px] w-full border border-white/10 glass-panel overflow-hidden">
                     <div className="w-full h-full transition-transform duration-700 group-hover:scale-110 relative">
                       <Image
                         src={event.image}
                         alt={event.title}
                         fill
                         sizes="(max-width: 1024px) 100vw, 50vw"
                         className="object-cover"
                       />
                     </div>
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                 <div className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
                 <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                     <span className={`px-3 py-1 rounded-sm border ${colors.border} ${colors.text} text-xs font-tech font-bold uppercase tracking-wider`}>
                         {event.category}
                     </span>
                     <span className="text-gray-500 text-xs font-tech uppercase tracking-wider flex items-center gap-2">
                         <Calendar size={12} /> {event.date}
                     </span>
                </div>
                
                <h3 className={`text-2xl md:text-3xl font-bold text-white font-display uppercase tracking-wide group-hover:${colors.text} transition-colors`}>
                    {event.title}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed border-l-2 border-white/10 pl-6 font-body line-clamp-4">
                    {event.description}
                </p>
                
                <div className="pt-2 flex items-center gap-6">
                    {isPreview ? (
                         <NextLink href={`/events/${slugify(event.title)}`}>
                            <button className={`text-white hover:${colors.text} transition-colors font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2`}>
                                Read More <ChevronRight size={16} />
                            </button>
                        </NextLink>
                    ) : (
                         <>
                            <button 
                                onClick={onViewDetails}
                                className={`px-8 py-3 bg-transparent border border-white/20 text-white hover:${colors.bg} hover:text-black hover:${colors.border} transition-all font-display font-bold uppercase tracking-widest text-sm`}
                            >
                                View Details
                            </button>
                             {event.status && (
                                <span className={`font-tech text-xs ${colors.text} uppercase tracking-widest`}>
                                     {event.status}
                                </span>
                             )}
                        </>
                    )}
                   
                </div>
            </div>
        </div>
    );
}
