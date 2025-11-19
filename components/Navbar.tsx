import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-500';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <Plane className="h-6 w-6 text-emerald-600 transform group-hover:-rotate-12 transition-transform" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Wanderlust
              </span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/flights" className={isActive('/flights')}>Flights</Link>
              <Link to="/hotels" className={isActive('/hotels')}>Hotels</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-emerald-100" />
                </div>
                <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-2 shadow-lg">
          <div className="flex flex-col space-y-3 py-2">
            <Link to="/flights" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600" onClick={() => setIsOpen(false)}>Flights</Link>
            <Link to="/hotels" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600" onClick={() => setIsOpen(false)}>Hotels</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600" onClick={() => setIsOpen(false)}>My Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-red-500 font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600 bg-emerald-50" onClick={() => setIsOpen(false)}>Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}