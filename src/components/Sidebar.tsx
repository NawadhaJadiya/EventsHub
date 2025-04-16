'use client';

// import React, { useEffect, useState } from 'react';
import useAuthStatus from '../hooks/useAuthStatus';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Clock, PlusCircle, History, ClipboardList, LogIn, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { isAdmin, isLoggedIn, logout } = useAuthStatus();
  const pathname = usePathname();
  
  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-secondary shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-8 h-8 text-primary animate-pulse-subtle" />
          <span>EventHub</span>
        </h1>
      </div>
      
      <nav className="mt-6">
        <Link
          href="/"
          className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
            isActive('/') ? 'bg-primary text-white' : ''
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>All Events</span>
        </Link>

        {(isLoggedIn) && (
          <>
            <Link
              href="/registered-events"
              className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
                isActive('/registered-events') ? 'bg-primary text-white' : ''
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Registered Events</span>
            </Link>

            {isAdmin && (
              <Link
                href="/my-events"
                className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
                  isActive('/my-events') ? 'bg-primary text-white' : ''
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>My Events</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/host"
                className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
                  isActive('/host-event') ? 'bg-primary text-white' : ''
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                <span>Host an Event</span>
              </Link>
            )}
          </>
        )}

        <Link
          href="/previous-events"
          className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
            isActive('/previous-events') ? 'bg-primary text-white' : ''
          }`}
        >
          <History className="w-5 h-5" />
          <span>Previous Events</span>
        </Link>

        {!isLoggedIn ? (
          <Link
            href="/login"
            className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 ${
              isActive('/login') ? 'bg-primary text-white' : ''
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 transform hover:translate-x-2 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;