import React from 'react';
import { Star, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import type { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gold-200/90 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
      <div>
        {/* Rating stars & verified tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'fill-gold-400 text-gold-400' : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          {review.verifiedBooking && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Host
            </span>
          )}
        </div>

        {/* Event tag */}
        <div className="mb-2">
          <span className="text-xs font-bold text-maroon-800 bg-gold-100/70 px-2.5 py-1 rounded-md border border-gold-200 inline-block">
            {review.eventType}
          </span>
        </div>

        {/* Comment */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
          "{review.comment}"
        </p>

        {/* Event image preview if available */}
        {review.eventImage && (
          <div className="mb-4 rounded-xl overflow-hidden h-36 border border-gold-200/60 shadow-xs">
            <img
              src={review.eventImage}
              alt={review.eventType}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        )}
      </div>

      {/* Reviewer info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          {review.userImage ? (
            <img
              src={review.userImage}
              alt={review.customerName}
              className="w-8 h-8 rounded-full object-cover border border-gold-400"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-maroon-800 text-gold-200 flex items-center justify-center font-bold text-xs">
              {review.customerName.charAt(0)}
            </div>
          )}
          <div>
            <h5 className="font-bold text-maroon-950 text-xs">{review.customerName}</h5>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-600" /> {review.city}
            </p>
          </div>
        </div>

        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {review.date}
        </span>
      </div>
    </div>
  );
};
