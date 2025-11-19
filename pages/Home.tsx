import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels'>('flights');
  const navigate = useNavigate();

  const [flightSearch, setFlightSearch] = useState({ from: 'New York', to: '', date: '' });
  const [hotelSearch, setHotelSearch] = useState({ location: '', date: '', guests: '1' });

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/flights?origin=${flightSearch.from}&destination=${flightSearch.to}`);
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels?location=${hotelSearch.location}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Travel Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4">
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg md:text-xl text-slate-100 drop-shadow-md">
              Compare the best flights and hotels for your perfect trip.
            </p>
          </div>

          {/* Search Widget */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button
                className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'flights' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                onClick={() => setActiveTab('flights')}
              >
                Flights
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'hotels' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                onClick={() => setActiveTab('hotels')}
              >
                Hotels
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'flights' ? (
                <form onSubmit={handleFlightSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Origin City"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        value={flightSearch.from}
                        onChange={(e) => setFlightSearch({ ...flightSearch, from: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Destination"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        value={flightSearch.to}
                        onChange={(e) => setFlightSearch({ ...flightSearch, to: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Departure</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
                        value={flightSearch.date}
                        onChange={(e) => setFlightSearch({ ...flightSearch, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <Search className="w-5 h-5" /> Search Flights
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleHotelSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="relative md:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        value={hotelSearch.location}
                        onChange={(e) => setHotelSearch({ ...hotelSearch, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Check In</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
                        value={hotelSearch.date}
                        onChange={(e) => setHotelSearch({ ...hotelSearch, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <Search className="w-5 h-5" /> Search Hotels
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Why Book With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Millions of Reviews</h3>
            <p className="text-slate-600">Real reviews from real travelers to help you make the best choice.</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
             <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Destinations</h3>
            <p className="text-slate-600">Curated lists of the world's most beautiful and exciting places.</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
             <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-slate-600">Seamless booking process with instant confirmation and support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}