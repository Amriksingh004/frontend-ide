import React from 'react';
import type { BookingStatusType } from '../../types';
import { 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Truck, 
  Wrench, 
  Sparkles, 
  RotateCcw, 
  DollarSign, 
  XCircle 
} from 'lucide-react';

interface BookingStatusProps {
  status: BookingStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export const BookingStatus: React.FC<BookingStatusProps> = ({
  status,
  size = 'md',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Confirmed':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-500',
        };
      case 'Crew Assigned':
        return {
          icon: UserCheck,
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-500',
        };
      case 'In Transit':
        return {
          icon: Truck,
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          dot: 'bg-purple-500',
        };
      case 'Setup Completed':
        return {
          icon: Wrench,
          bg: 'bg-teal-100 text-teal-900 border-teal-300',
          dot: 'bg-teal-500',
        };
      case 'Event Active':
        return {
          icon: Sparkles,
          bg: 'bg-amber-100 text-maroon-900 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'Picked Up':
        return {
          icon: RotateCcw,
          bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          dot: 'bg-indigo-500',
        };
      case 'Deposit Refunded':
        return {
          icon: DollarSign,
          bg: 'bg-emerald-200 text-emerald-950 border-emerald-400 font-extrabold',
          dot: 'bg-emerald-600',
        };
      case 'Cancelled':
        return {
          icon: XCircle,
          bg: 'bg-rose-100 text-rose-900 border-rose-300',
          dot: 'bg-rose-500',
        };
      case 'Pending':
      default:
        return {
          icon: Clock,
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  return (
    <span className={`inline-flex items-center font-bold rounded-full border shadow-2xs ${config.bg} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{status}</span>
    </span>
  );
};
