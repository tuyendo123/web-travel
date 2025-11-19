import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookingService } from '../services/mockDb';
import { Booking } from '../types';
import { Plane, Hotel as HotelIcon, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      if (user) {
        const data = await BookingService.getByUserId(user.id);
        setBookings(data);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [isAuthenticated, navigate, user]);

  // Prepare chart data
  const chartData = [
    { name: 'Jan', spending: 0 },
    { name: 'Feb', spending: 0 },
    { name: 'Mar', spending: 0 },
    { name: 'Apr', spending: 0 },
    { name: 'May', spending: 0 },
    { name: 'Jun', spending: 0 },
    { name: 'Jul', spending: 0 },
    { name: 'Aug', spending: 0 },
    { name: 'Sep', spending: 0 },
    { name: 'Oct', spending: 450 }, // Mock initial data
    { name: 'Nov', spending: 0 },
    { name: 'Dec', spending: 0 },
  ];

  bookings.forEach(b => {
      const month = new Date(b.date).getMonth();
      chartData[month].spending += b.totalAmount;
  });

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user?.name}</h1>
            <p className="text-slate-500">Here's an overview of your travel activity.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm text-slate-500">Total Spent YTD</span>
            <p className="text-2xl font-bold text-emerald-600">
              ${bookings.reduce((acc, b) => acc + b.totalAmount, 0)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Spending History</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="spending" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats / Profile */}
          <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Traveler Status</h3>
              <p className="text-emerald-100 text-sm mb-6">You are currently a Silver Tier member.</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Points</span>
                    <span className="font-bold">2,450 / 5,000</span>
                  </div>
                  <div className="w-full bg-emerald-800 rounded-full h-2">
                    <div className="bg-emerald-300 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-emerald-200">Earn 2,550 more points to reach Gold Status.</p>
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 opacity-10">
               <Plane className="w-64 h-64" />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Recent Bookings</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${booking.type === 'flight' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      {booking.type === 'flight' ? <Plane className="w-6 h-6" /> : <HotelIcon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {booking.type === 'flight' 
                          ? `${(booking.details as any).origin} to ${(booking.details as any).destination}`
                          : (booking.details as any).name
                        }
                      </h4>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> 
                        {new Date(booking.date).toLocaleDateString()}
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        #{booking.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                     <div className="text-right">
                       <span className="block text-sm text-slate-400">Total</span>
                       <span className="font-bold text-slate-800">${booking.totalAmount}</span>
                     </div>
                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                       {booking.status}
                     </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500">
                You haven't made any bookings yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}