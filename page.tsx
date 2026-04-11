"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Loader2, ArrowLeft, Heart, Share2, Info } from "lucide-react";
import Link from "next/link";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function MoviePage({ params }: { params: { id: string } }) {
    const [movie, setMovie] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`${API_URL}/movies/${params.id}`);
                setMovie(res.data);
            } catch (error) {
                console.error("Failed to fetch movie", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovie();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!movie) return <div className="text-center pt-20">Movie not found</div>;

    const plyrProps = {
        source: {
            type: "video" as const,
            sources: [
                {
                    src: movie.videoUrl,
                    type: "video/mp4",
                    size: 1080 // We store the quality in DB
                }
            ],
            tracks: movie.subtitlesUrl ? [
                {
                    kind: "captions" as const,
                    label: "English",
                    srclang: "en",
                    src: movie.subtitlesUrl,
                    default: true
                }
            ] : []
        },
        options: {
            autoplay: true,
            controls: [
                "play-large", "play", "progress", "current-time", "mute", "volume", 
                "captions", "settings", "pip", "airplay", "fullscreen"
            ],
            settings: ["quality", "speed"],
            quality: {
                default: 1080,
                options: [1080, 720, 480]
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b]">
            <Navbar />
            
            <div className="pt-24 md:pt-32 px-6 md:px-16 space-y-8">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Home
                </Link>

                {/* Video Container */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/5">
                    <Plyr {...plyrProps} />
                </div>

                {/* Info Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                            <span className="text-blue-500">{movie.views} Views</span>
                            <span className="bg-white/5 px-2 py-1 rounded text-gray-400 uppercase tracking-widest">{movie.quality}</span>
                            <span className="text-gray-500">{new Date(movie.createdAt).getFullYear()}</span>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-[#121214] border border-[#1e1e20] rounded-2xl space-y-4">
                            <h3 className="font-bold flex items-center gap-2 tracking-tight"><Info className="w-5 h-5" /> Details</h3>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-500">Category: <span className="text-white ml-2">{movie.category?.name}</span></p>
                                <p className="text-gray-500">Language: <span className="text-white ml-2">English</span></p>
                                <p className="text-gray-500">Subtitles: <span className="text-white ml-2">{movie.subtitlesUrl ? "Available" : "No"}</span></p>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-[#1e1e20]">
                                <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    <Heart className="w-5 h-5" /> Favorite
                                </button>
                                <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    <Share2 className="w-5 h-5" /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
