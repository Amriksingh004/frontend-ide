import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  showPills?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  onSearch,
  placeholder = "Search royal mandaps, haldi swings, reception stages, brass urlis...",
  showPills = true,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handlePillClick = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  const suggestions = [
    'Rajwada Mandap',
    'Haldi Jhula',
    'Moroccan Mehndi',
    'Reception Stage',
    'Brass Urli',
    'Fairy Light Tunnel',
    'Cold Pyro',
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-maroon-800 pointer-events-none">
          <Search className="w-5 h-5 text-gold-600" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-white border-2 border-gold-300 hover:border-gold-400 focus:border-maroon-800 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-gold-400/20 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium transition duration-200"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 sm:right-24 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-700 hover:to-maroon-800 text-gold-200 text-xs sm:text-sm font-bold rounded-xl shadow transition duration-200 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {showPills && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
            Popular:
          </span>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handlePillClick(item)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                searchTerm.toLowerCase() === item.toLowerCase()
                  ? 'bg-maroon-800 text-gold-200 border-maroon-800 shadow-xs'
                  : 'bg-white hover:bg-gold-50 text-slate-700 border-gold-200 hover:border-gold-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
