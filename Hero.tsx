"use client";

import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
    movie: {
        _id: string;
        title: string;
        description: string;
        thumbnailUrl: string;
    };
}

export default function Hero({ movie }: HeroProps) {
    return (
        <section className="relative w-full h-[70vh] md:h-[95vh] overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src={movie.thumbnailUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 hero-overlay" />
                <div className="absolute inset-0 netflix-gradient" />
            </div>

            <div className="relative h-full flex flex-col justify-end pb-20 px-6 md:px-16 max-w-4xl space-y-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-balance"
                >
                    {movie.title}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg text-gray-200 line-clamp-3 md:max-w-2xl"
                >
                    {movie.description}
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 pt-4"
                >
                    <Link href={`/movie/${movie._id}`} className="bg-white text-black px-6 md:px-10 py-3 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <Play className="w-6 h-6 fill-current" /> Play
                    </Link>
                    <button className="bg-gray-500/50 backdrop-blur-md text-white px-6 md:px-10 py-3 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-gray-500/70 transition-colors">
                        <Info className="w-6 h-6" /> More Info
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
