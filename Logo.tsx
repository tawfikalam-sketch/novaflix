"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "w-32 h-auto" }: { className?: string }) {
    return (
        <Link href="/" className="flex items-center">
            <img 
                src="/novaflix_logo.png" 
                alt="NovaFlix Logo" 
                className={className}
            />
        </Link>
    );
}
