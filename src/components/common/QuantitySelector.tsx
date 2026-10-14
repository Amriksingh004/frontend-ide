import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  max?: number;
  min?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const buttonSizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }[size];

  const textSizeClasses = {
    sm: 'w-8 text-xs',
    md: 'w-10 text-sm',
    lg: 'w-14 text-base font-bold',
  }[size];

  return (
    <div className="inline-flex items-center bg-ivory-100 border border-gold-300 rounded-xl p-0.5 shadow-sm">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${buttonSizeClasses} flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-gold-50 hover:text-maroon-900 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className={`${textSizeClasses} text-center font-bold text-maroon-900 select-none`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${buttonSizeClasses} flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-gold-50 hover:text-maroon-900 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
