import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FlightSearch from './pages/FlightSearch';
import HotelSearch from './pages/HotelSearch';
import BookingCheckout from './pages/BookingCheckout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<FlightSearch />} />
              <Route path="/hotels" element={<HotelSearch />} />
              <Route path="/checkout" element={<BookingCheckout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;