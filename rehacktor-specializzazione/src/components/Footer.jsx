import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";

export default function Footer() {
    const { session } = useContext(SessionContext);
    const isAuthenticated = Boolean(session?.user);
    
    return (
        <footer className="bg-gray-900 text-white py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
        <span className="text-xl font-bold">GameNest</span>
        </div>
        <nav className="flex space-x-6">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
        HomePage
        </Link>
        
        {isAuthenticated ? (
            <>
            <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
            Profile
            </Link>
            <Link to="/account" className="text-gray-400 hover:text-white transition-colors duration-200">
            Account Settings
            </Link>
            </>
        ) : (
            <>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-200">
            Login
            </Link>
            <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-200">
            Register
            </Link>
            </>
        )}
        </nav>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GameNest. All rights reserved.
        </div>
        </div>
        </footer>
    );
}
