import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FlightService } from '../services/mockDb';
import { Flight } from '../types';
import { Clock, ArrowRight, DollarSign, Filter } from 'lucide-react';

export default function FlightSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const data = await FlightService.search(origin, destination);
      setFlights(data);
      setLoading(false);
    };
    fetchFlights();
  }, [origin, destination]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-slate-500" />
                <h2 className="font-bold text-lg text-slate-800">Filters</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Stops</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                      Non-stop
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                      1 Stop
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Airlines</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                      SkyHigh Airways
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                      Oceanic Airlines
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800">
                Flights from <span className="text-emerald-600">{origin || 'Anywhere'}</span> to <span className="text-emerald-600">{destination || 'Anywhere'}</span>
              </h1>
              <p className="text-slate-500 mt-1">{flights.length} results found</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse h-40"></div>
                ))}
              </div>
            ) : flights.length > 0 ? (
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6">
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-xs">
                            LOGO
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800">{flight.airline}</h3>
                            <p className="text-xs text-slate-500">{flight.flightNumber}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {flight.seatsAvailable} seats left
                        </span>
                      </div>

                      <div className="flex items-center gap-4 md:gap-8">
                        <div>
                          <p className="text-xl font-bold text-slate-800">{new Date(flight.departTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="text-sm text-slate-500">{flight.origin}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <p className="text-xs text-slate-400 mb-1">{flight.duration}</p>
                          <div className="w-full h-px bg-slate-300 relative">
                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                               <PlaneIcon className="w-4 h-4 text-slate-300 transform rotate-90" />
                             </div>
                          </div>
                          <p className="text-xs text-emerald-600 mt-1 font-medium">Non-stop</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-slate-800">{new Date(flight.arriveTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          <p className="text-sm text-slate-500">{flight.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0 flex flex-row md:flex-col items-center justify-between gap-4">
                      <div className="text-center md:text-right">
                        <p className="text-sm text-slate-400">Price per person</p>
                        <p className="text-3xl font-bold text-emerald-600">${flight.price}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/checkout?type=flight&id=${flight.id}`)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                      >
                        Select <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No flights found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h20" />
      <path d="M19 12l-7-7" />
      <path d="M19 12l-7 7" />
    </svg>
  );
}
