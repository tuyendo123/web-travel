import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Wanderlust</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Making your dream destinations a reality. Book flights and hotels with ease and confidence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-400"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-400"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Wanderlust Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}