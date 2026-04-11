"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Home() {
    const [trending, setTrending] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [anime, setAnime] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendRes, movieRes, animeRes] = await Promise.all([
                    axios.get(`${API_URL}/movies?isTrending=true&limit=10`),
                    axios.get(`${API_URL}/movies?type=movie&limit=15`),
                    axios.get(`${API_URL}/movies?type=anime&limit=15`)
                ]);

                setTrending(trendRes.data);
                setMovies(movieRes.data);
                setAnime(animeRes.data);
            } catch (error) {
                console.error("Failed to fetch content", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <main className="relative bg-[#0a0a0b] min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            {trending.length > 0 && <Hero movie={trending[0]} />}

            {/* Content Rows */}
            <div className={`relative px-6 md:px-16 space-y-16 pb-20 ${trending.length > 0 ? "-mt-40 z-20" : "pt-24"}`}>
                
                {/* Trending Now */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Trending Now</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                        {trending.map((m) => <MovieCard key={m._id} movie={m} />)}
                    </div>
                </section>

                {/* Popular Movies */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Popular Movies</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
                    </div>
                </section>

                {/* Latest Anime */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">Must Watch Anime</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                        {anime.map((m) => <MovieCard key={m._id} movie={m} />)}
                    </div>
                </section>

            </div>
        </main>
    );
}
