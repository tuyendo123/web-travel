import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FlightService, HotelService, BookingService } from '../services/mockDb';
import { Flight, Hotel } from '../types';
import { CheckCircle, CreditCard, Lock } from 'lucide-react';

export default function BookingCheckout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const type = searchParams.get('type') as 'flight' | 'hotel';
  const id = searchParams.get('id');

  const [item, setItem] = useState<Flight | Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  useEffect(() => {
    if (!type || !id) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      if (type === 'flight') {
        const flight = await FlightService.getById(id);
        setItem(flight || null);
      } else {
        const hotel = await HotelService.getById(id);
        setItem(hotel || null);
      }
      setLoading(false);
    };
    fetchData();
  }, [type, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to book.");
      navigate('/login');
      return;
    }
    
    setProcessing(true);
    
    // Simulate API call
    try {
      if (item) {
        await BookingService.create({
            userId: user.id,
            type,
            itemId: item.id,
            details: item,
            date: new Date().toISOString(),
            status: 'confirmed',
            totalAmount: 'price' in item ? item.price : (item as Hotel).pricePerNight
        });
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading details...</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center">Item not found</div>;

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-8">Your booking has been successfully processed. A confirmation email has been sent to {formData.email}.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/dashboard')} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700">
              View My Bookings
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-white text-slate-600 py-3 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50">
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const price = 'price' in item ? item.price : (item as Hotel).pricePerNight;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Passenger / Guest Details</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        />
                        <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                        <input
                          required
                          type="text"
                          placeholder="MM/YY"
                          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                        <input
                          required
                          type="text"
                          placeholder="123"
                          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={formData.cvc}
                          onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3 text-sm text-slate-600">
                  <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p>Your payment information is processed securely. We do not store your credit card details on our servers.</p>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-emerald-700 transition-all active:scale-[0.99] ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {processing ? 'Processing...' : `Pay $${price}`}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Booking Summary</h3>
              
              <div className="mb-4 pb-4 border-b border-slate-100">
                {'airline' in item ? (
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Flight</p>
                    <p className="font-bold text-slate-800 text-lg">{(item as Flight).origin} → {(item as Flight).destination}</p>
                    <p className="text-sm text-slate-600 mt-1">{(item as Flight).airline} • {(item as Flight).flightNumber}</p>
                    <p className="text-sm text-slate-600">{new Date((item as Flight).departTime).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Hotel</p>
                    <p className="font-bold text-slate-800 text-lg">{(item as Hotel).name}</p>
                    <p className="text-sm text-slate-600 mt-1">{(item as Hotel).location}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Base Fare</span>
                  <span>${price}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Fees</span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold text-lg pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span>${price + 45}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}