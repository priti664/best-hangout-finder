import { motion } from 'framer-motion';
import type { Category } from '@/types/place';
import { categories } from '@/data/places';
import { Coffee, ShoppingBag, UtensilsCrossed, Beef, Trees, Gamepad2 } from 'lucide-react';

const iconConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  'Cafes': { icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-100' },
  'Malls': { icon: ShoppingBag, color: 'text-pink-600', bg: 'bg-pink-100' },
  'Restaurants': { icon: UtensilsCrossed, color: 'text-red-500', bg: 'bg-red-100' },
  "McDonald's": { icon: Beef, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  'Parks': { icon: Trees, color: 'text-green-600', bg: 'bg-green-100' },
  'Others': { icon: Gamepad2, color: 'text-violet-600', bg: 'bg-violet-100' },
};

interface CategoryChipsProps {
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((cat, i) => {
        const config = iconConfig[cat] || { icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-100' };
        const Icon = config.icon;
        const isActive = selected === cat;
        return (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(isActive ? null : cat)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'card-gradient text-white shadow-lg shadow-primary/20'
                : 'bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-accent'
            }`}
          >
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${isActive ? 'bg-white/20' : config.bg}`}>
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : config.color}`} />
            </span>
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
