import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ProductDetails } from '../components/decorations/ProductDetails';
import { ArrowLeft } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { products, selectedProductId, navigateTo } = useBooking();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
        <h2 className="font-serif text-xl font-bold text-maroon-950">Item Not Found</h2>
        <p className="text-xs text-slate-500">The requested decor item is not in our active catalog.</p>
        <button
          onClick={() => navigateTo('decorations')}
          className="px-6 py-2.5 bg-maroon-800 text-gold-200 font-bold text-xs rounded-xl shadow"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return <ProductDetails product={product} />;
};
