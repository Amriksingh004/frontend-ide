import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const { login, navigateTo } = useBooking();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('rohit.khandelwal@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rohit Khandelwal');
  const [phone, setPhone] = useState('+91 98290 41122');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (role === 'admin') {
      navigateTo('admin-dashboard');
    } else {
      navigateTo('user-dashboard');
    }
  };

  const handleQuickCustomer = () => {
    setEmail('rohit.khandelwal@gmail.com');
    setRole('customer');
    login('rohit.khandelwal@gmail.com', 'customer');
    navigateTo('user-dashboard');
  };

  const handleQuickAdmin = () => {
    setEmail('admin@utsavdecor.in');
    setRole('admin');
    login('admin@utsavdecor.in', 'admin');
    navigateTo('admin-dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl p-8 border-2 border-gold-300 shadow-2xl space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 mx-auto flex items-center justify-center text-gold-300 shadow-md border border-gold-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-maroon-950">
            {isRegister ? 'Create Your UTSAV Account' : 'Welcome to UTSAV'}
          </h2>
          <p className="text-xs text-slate-500">
            {isRegister
              ? 'Join thousands of hosts creating memorable Indian celebrations'
              : 'Sign in to manage your decor rentals, track crew & deposits'}
          </p>
        </div>

        {/* Quick Demo Logins Box */}
        <div className="bg-ivory-50 p-3.5 rounded-2xl border border-gold-200 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block text-center">
            ⚡ Quick Demo Logins for Instant Testing:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="py-2 px-3 bg-white hover:bg-gold-50 text-maroon-900 font-bold rounded-xl border border-gold-300 shadow-2xs transition flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold-600" /> Host Demo
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="py-2 px-3 bg-maroon-900 hover:bg-maroon-800 text-gold-200 font-bold rounded-xl shadow-2xs transition flex items-center justify-center gap-1.5"
            >
              👑 Admin Demo
            </button>
          </div>
        </div>

        {/* Role toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              role === 'customer'
                ? 'bg-white text-maroon-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Host / Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              role === 'admin'
                ? 'bg-maroon-900 text-gold-200 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Administrator
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-gold-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-maroon-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 font-serif font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>{isRegister ? 'Complete Registration' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs">
          {isRegister ? (
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-maroon-800 hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-slate-600">
              Planning your first event?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-maroon-800 hover:underline"
              >
                Create Account (Get ₹1,000 Off)
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
