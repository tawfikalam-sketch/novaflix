"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled ? "bg-[#0a0a0b]/95 backdrop-blur-sm" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-3xl font-black text-blue-500 tracking-tighter">
                        NOVAFLIX
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/?type=movie" className="hover:text-white transition-colors">Movies</Link>
                        <Link href="/?type=anime" className="hover:text-white transition-colors">Anime</Link>
                        <Link href="/trending" className="hover:text-white transition-colors">Trending</Link>
                        <Link href="/favorites" className="hover:text-white transition-colors">My List</Link>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <button className="text-white hover:text-blue-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="hidden sm:block text-white hover:text-blue-500 transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 bg-[#0a0a0b] z-[60] flex flex-col p-10"
                    >
                        <button className="absolute top-6 right-6" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-8 h-8" />
                        </button>
                        <div className="flex flex-col gap-8 text-2xl font-bold mt-10">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            <Link href="/?type=movie" onClick={() => setIsMobileMenuOpen(false)}>Movies</Link>
                            <Link href="/?type=anime" onClick={() => setIsMobileMenuOpen(false)}>Anime</Link>
                            <Link href="/trending" onClick={() => setIsMobileMenuOpen(false)}>Trending</Link>
                            <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)}>My List</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
