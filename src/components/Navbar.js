'use client';

import { Menu, Heart, ShoppingCart, User } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left Section: Burger Menu & Logo */}
                    <div className="flex items-center">
                        {/* Burger Menu - Mobile Only */}
                        <button
                            onClick={onToggleSidebar}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F78410]"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center ml-4 md:ml-0">
                            <span className="text-2xl font-bold text-primary-500">TravelApp</span>
                        </div>
                    </div>

                    {/* Right Section: User Actions */}
                    <div className="flex items-center space-x-1">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Favorites"
                        >
                            <Heart className="h-6 w-6 text-gray-700" />
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className="h-6 w-6 text-gray-700" />
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="User Profile"
                        >
                            <User className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}