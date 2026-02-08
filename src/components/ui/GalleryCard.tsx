
import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryItem {
    id: string | number;
    src: string; // for preview data it might be 'image'
    // map src to image if needed or allow both
    image?: string;
    category: string;
    title?: string;
}

interface GalleryCardProps {
    item: GalleryItem;
    onClick?: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
    const imageSrc = item.src || item.image || "";
    
  return (
    <motion.div
        layout
        onClick={onClick}
        className="break-inside-avoid relative group overflow-hidden border border-white/10 hover:border-cyber-cyan/50 transition-colors cursor-pointer w-full"
    >
        {/* Tech Corners */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>

        <div className="relative"> 
            <Image
                src={imageSrc}
                alt={item.title || `${item.category} Image`}
                width={500}
                height={300}
                style={{ width: '100%', height: 'auto' }}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 z-10">
                <span className="text-cyber-cyan font-tech text-xs uppercase tracking-wider">{item.category}</span>
               {item.title && <h3 className="text-white font-bold font-display uppercase tracking-wide text-lg mt-1">{item.title}</h3>}
        </div>
    </motion.div>
  );
}
