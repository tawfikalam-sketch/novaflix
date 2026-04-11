"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Plus } from "lucide-react";

interface MovieCardProps {
    movie: {
        _id: string;
        title: string;
        thumbnailUrl: string;
        category?: { name: string };
    };
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <motion.div 
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="relative flex-none w-40 md:w-64 aspect-[2/3] rounded-md overflow-hidden bg-[#18181b] group"
        >
            <Link href={`/movie/${movie._id}`}>
                <img 
                    src={movie.thumbnailUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform group-hover:brightness-50"
                />
            </Link>

            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-bold text-sm md:text-lg mb-1 truncate">{movie.title}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={`/movie/${movie._id}`} className="p-2 bg-white rounded-full text-black hover:bg-gray-200">
                            <Play className="w-3 h-3 fill-current" />
                        </Link>
                        <button className="p-2 bg-gray-800/80 rounded-full border border-gray-600 hover:border-white">
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
