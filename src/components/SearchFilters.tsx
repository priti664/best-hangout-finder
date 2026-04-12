import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, IndianRupee } from 'lucide-react';
import CategoryChips from './CategoryChips';
import { allLocations, allPlaces } from '@/data/places';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (c: string | null) => void;
  minBudget: string;
  maxBudget: string;
  onMinBudgetChange: (v: string) => void;
  onMaxBudgetChange: (v: string) => void;
  selectedLocation: string;
  onLocationChange: (l: string) => void;
}

const SearchFilters = ({
  searchQuery, onSearchChange,
  selectedCategory, onCategoryChange,
  minBudget, maxBudget, onMinBudgetChange, onMaxBudgetChange,
  selectedLocation, onLocationChange,
}: SearchFiltersProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchInput = (val: string) => {
    onSearchChange(val);
    if (val.length > 0) {
      const q = val.toLowerCase();
      const matches = new Set<string>();
      allPlaces.forEach(p => {
        if (p.name.toLowerCase().includes(q)) matches.add(p.name);
        if (p.location.toLowerCase().includes(q)) matches.add(p.location);
        if (p.category.toLowerCase().includes(q)) matches.add(p.category);
      });
      setSuggestions([...matches].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleBudgetInput = (val: string, setter: (v: string) => void) => {
    const cleaned = val.replace(/^0+(?=\d)/, '').replace(/[^0-9]/g, '');
    setter(cleaned);
  };

  const handleMinKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' || e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault();
      maxRef.current?.focus();
    }
  };

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search places, locations, or categories..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 top-full mt-1 w-full bg-popover border border-border rounded-xl shadow-xl overflow-hidden">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => { onSearchChange(s); setShowSuggestions(false); }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Budget + Location row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium whitespace-nowrap pointer-events-none">Min ₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={minBudget}
              onChange={e => handleBudgetInput(e.target.value, onMinBudgetChange)}
              onKeyDown={handleMinKeyDown}
              placeholder="0"
              className="w-full pl-14 pr-3 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
            />
          </div>
          <span className="text-muted-foreground text-sm text-center hidden sm:block">–</span>
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium whitespace-nowrap pointer-events-none">Max ₹</span>
            <input
              ref={maxRef}
              type="text"
              inputMode="numeric"
              value={maxBudget}
              onChange={e => handleBudgetInput(e.target.value, onMaxBudgetChange)}
              placeholder="1500"
              className="w-full pl-14 pr-3 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
            />
          </div>
        </div>

        <div className="relative min-w-[160px] flex items-center">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          <select
            value={selectedLocation}
            onChange={e => onLocationChange(e.target.value)}
            className="w-full h-[46px] pl-9 pr-8 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent/40 leading-[46px]"
          >
            <option value="">All Locations</option>
            {allLocations.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category chips */}
      <CategoryChips selected={selectedCategory} onSelect={onCategoryChange} />
    </div>
  );
};

export default SearchFilters;
