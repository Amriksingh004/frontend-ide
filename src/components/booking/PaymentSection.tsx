import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Building, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Clock, 
  Loader2,
  Lock,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface PaymentSectionProps {
  grandTotal: number;
  onPaymentSuccess: (method: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'CashOnSetup', paymentStatus: 'Paid' | 'Advance Paid (30%)') => void;
  isFormValid: boolean;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  grandTotal,
  onPaymentSuccess,
  isFormValid,
}) => {
  const { showToast } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'AdvanceToken'>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [qrTimer, setQrTimer] = useState(300); // 5 minutes countdown

  // 30% advance option
  const advanceAmount = Math.round(grandTotal * 0.3);
  const remainingAmount = grandTotal - advanceAmount;

  // Countdown timer for QR code
  useEffect(() => {
    let interval: any;
    if (showQrModal && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQrModal, qrTimer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyUpiId = () => {
    navigator.clipboard?.writeText('utsav.rentals@hdfcbank');
    showToast('UPI ID copied to clipboard!');
  };

  const handlePayClick = () => {
    if (!isFormValid) {
      showToast('⚠️ Please fill all required venue and contact details first.');
      return;
    }

    if (paymentMethod === 'UPI') {
      setShowQrModal(true);
      setQrTimer(300);
    } else if (paymentMethod === 'Razorpay') {
      setShowRazorpayModal(true);
    } else {
      // Direct mock simulation
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const status = paymentMethod === 'AdvanceToken' ? 'Advance Paid (30%)' : 'Paid';
        const method = paymentMethod === 'AdvanceToken' ? 'UPI' : (paymentMethod as any);
        onPaymentSuccess(method, status);
      }, 1800);
    }
  };

  const handleConfirmUpiPaid = () => {
    setShowQrModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess('UPI', 'Paid');
    }, 1500);
  };

  const handleRazorpayModalConfirm = () => {
    setShowRazorpayModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess('Razorpay', 'Paid');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gold-300 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-serif text-lg font-bold text-maroon-950 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600" /> Secure Payment Gateway
        </h3>
        <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
          Instant Confirmation
        </span>
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setPaymentMethod('UPI')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
            paymentMethod === 'UPI'
              ? 'bg-maroon-900 text-gold-200 border-maroon-900 shadow-sm'
              : 'bg-ivory-50 text-slate-700 border-gold-200 hover:border-gold-300'
          }`}
        >
          <Smartphone className="w-5 h-5 text-gold-400" />
          <span>UPI / QR Scan</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('Razorpay')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
            paymentMethod === 'Razorpay'
              ? 'bg-maroon-900 text-gold-200 border-maroon-900 shadow-sm'
              : 'bg-ivory-50 text-slate-700 border-gold-200 hover:border-gold-300'
          }`}
        >
          <Sparkles className="w-5 h-5 text-gold-400" />
          <span>Razorpay Fast</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('Card')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
            paymentMethod === 'Card'
              ? 'bg-maroon-900 text-gold-200 border-maroon-900 shadow-sm'
              : 'bg-ivory-50 text-slate-700 border-gold-200 hover:border-gold-300'
          }`}
        >
          <CreditCard className="w-5 h-5 text-gold-400" />
          <span>Credit / Debit</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('AdvanceToken')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
            paymentMethod === 'AdvanceToken'
              ? 'bg-maroon-900 text-gold-200 border-maroon-900 shadow-sm'
              : 'bg-ivory-50 text-slate-700 border-gold-200 hover:border-gold-300'
          }`}
        >
          <Banknote className="w-5 h-5 text-emerald-500" />
          <span>30% Token Pay</span>
        </button>
      </div>

      {/* UPI Body */}
      {paymentMethod === 'UPI' && (
        <div className="bg-ivory-50/80 p-4 rounded-2xl border border-gold-200 space-y-3 text-xs">
          <p className="font-semibold text-slate-700">
            Pay instantly with any UPI app on your phone:
          </p>
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold text-slate-700">
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
              <span className="text-blue-600 font-black text-sm">GPay</span>
              <span className="text-[10px] text-slate-400">Google Pay</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
              <span className="text-purple-600 font-black text-sm">PhonePe</span>
              <span className="text-[10px] text-slate-400">UPI / QR</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
              <span className="text-sky-500 font-black text-sm">Paytm</span>
              <span className="text-[10px] text-slate-400">BHIM UPI</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center">
              <span className="text-emerald-600 font-black text-sm">BHIM</span>
              <span className="text-[10px] text-slate-400">All Banks</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gold-200">
            <span className="text-slate-500 font-mono">utsav.rentals@hdfcbank</span>
            <button
              type="button"
              onClick={handleCopyUpiId}
              className="text-maroon-800 hover:text-maroon-950 font-bold flex items-center gap-1 text-[11px]"
            >
              <Copy className="w-3.5 h-3.5" /> Copy ID
            </button>
          </div>
        </div>
      )}

      {/* 30% Token Pay Body */}
      {paymentMethod === 'AdvanceToken' && (
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 space-y-2 text-xs text-emerald-950">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Lock Your Event Dates with 30% Advance</span>
          </div>
          <p className="text-emerald-800 leading-relaxed">
            Pay only <strong>₹{advanceAmount.toLocaleString('en-IN')}</strong> now to secure inventory from our fleet. Pay the balance <strong>₹{remainingAmount.toLocaleString('en-IN')}</strong> directly to the setup crew leader upon on-site handover!
          </p>
        </div>
      )}

      {/* Pay Now Button */}
      <div>
        <button
          type="button"
          onClick={handlePayClick}
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-serif font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2 border border-emerald-500"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying & Locking Dates...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>
                {paymentMethod === 'AdvanceToken'
                  ? `Pay Advance ₹${advanceAmount.toLocaleString('en-IN')} & Book`
                  : `Pay Grand Total ₹${grandTotal.toLocaleString('en-IN')} & Confirm`}
              </span>
            </>
          )}
        </button>
      </div>

      {/* UPI QR Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border-2 border-gold-300 relative animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-serif font-bold text-sm text-maroon-950">UTSAV UPI QR</span>
              <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {formatTimer(qrTimer)}
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Scan with GPay, PhonePe, Paytm, or BHIM:
            </p>

            {/* Generated QR Mock with Indian Wedding Motif */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-maroon-900 shadow-md flex flex-col items-center justify-center relative">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=utsav.rentals@hdfcbank&pn=UTSAV%20Decor%20Rentals&am=1000&cu=INR"
                alt="UTSAV UPI QR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-maroon-900 text-gold-200 flex items-center justify-center font-bold text-[10px] shadow border border-gold-400">
                  UTSAV
                </div>
              </div>
            </div>

            <div className="bg-ivory-50 p-2.5 rounded-xl border border-gold-200 text-xs">
              <span className="text-slate-400 block text-[10px]">Paying Amount</span>
              <span className="font-serif text-lg font-bold text-maroon-900">
                ₹{paymentMethod === 'AdvanceToken' ? advanceAmount.toLocaleString('en-IN') : grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmUpiPaid}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                I Have Completed UPI Payment
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel / Choose Another Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Razorpay Modal Simulation */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-300 animate-in zoom-in-95">
            {/* Razorpay Header */}
            <div className="bg-[#0c2340] p-4 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <span className="text-sky-400 font-black">Razorpay</span>
                  <span className="text-xs text-slate-300">Trusted Checkout</span>
                </h4>
                <p className="text-[11px] text-slate-300">UTSAV Luxury Event Rentals Pvt Ltd</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-300 block">Total Amount</span>
                <span className="font-bold text-sm text-sky-300">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 font-medium">Select Instant Payment Gateway Option:</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleRazorpayModalConfirm}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition flex items-center justify-between"
                >
                  <span className="font-bold text-slate-800">HDFC / ICICI / SBI Netbanking</span>
                  <span className="text-sky-600 font-bold">Pay ₹{grandTotal.toLocaleString('en-IN')} →</span>
                </button>
                <button
                  type="button"
                  onClick={handleRazorpayModalConfirm}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition flex items-center justify-between"
                >
                  <span className="font-bold text-slate-800">Visa / Mastercard / Rupay Debit & Credit</span>
                  <span className="text-sky-600 font-bold">Pay →</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowRazorpayModal(false)}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Cancel Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
