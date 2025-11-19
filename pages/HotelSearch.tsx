import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HotelService } from '../services/mockDb';
import { Hotel } from '../types';
import { Star, MapPin, Wifi, Coffee } from 'lucide-react';

export default function HotelSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = searchParams.get('location') || '';

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const data = await HotelService.search(location);
      setHotels(data);
      setLoading(false);
    };
    fetchHotels();
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Stays in <span className="text-emerald-600">{location || 'Popular Destinations'}</span>
          </h1>
          <p className="text-slate-500 mt-2">Find the perfect place for your getaway.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-96 animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-slate-800 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {hotel.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{hotel.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </div>

                  <div className="flex gap-3 mb-6">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md flex items-center gap-1">
                        {amenity === 'Free WiFi' ? <Wifi className="w-3 h-3" /> : amenity === 'Breakfast Included' ? <Coffee className="w-3 h-3" /> : null}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400">Start from</p>
                      <p className="text-2xl font-bold text-emerald-600">${hotel.pricePerNight}<span className="text-sm text-slate-500 font-normal">/night</span></p>
                    </div>
                    <button
                      onClick={() => navigate(`/checkout?type=hotel&id=${hotel.id}`)}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && hotels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No hotels found in this location.</p>
          </div>
        )}
      </div>
    </div>
  );
}