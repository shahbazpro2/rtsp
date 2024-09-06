import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="bg-black/95 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-white font-bold text-xl">Rtsp Detector</Link>

                {/* Navigation Links */}
                <nav className="flex space-x-8">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/events" className="text-white hover:text-gray-300">
                        Events
                    </Link>
                    <Link href="/historical" className="text-white hover:text-gray-300">
                        Historical Event
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
