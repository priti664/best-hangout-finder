import type { Place } from '@/types/place';
import PlaceCard from './PlaceCard';
import { allPlaces } from '@/data/places';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface PlaceGridProps {
  places: Place[];
  userLat?: number;
  userLng?: number;
}

const PlaceGrid = ({ places, userLat, userLng }: PlaceGridProps) => {
  if (places.length === 0) {
    // Smart fallback - never show "no results"
    const trending = [...allPlaces]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);

    return (
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-6 text-muted-foreground"
        >
          <TrendingUp className="w-5 h-5 text-accent" />
          <p className="text-sm font-medium">
            No exact match — here are <span className="text-accent font-semibold">top-rated & trending</span> spots you'll love
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {trending.map((p, i) => (
            <PlaceCard key={p.id} place={p} index={i} userLat={userLat} userLng={userLng} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {places.map((p, i) => (
        <PlaceCard key={p.id} place={p} index={i} userLat={userLat} userLng={userLng} />
      ))}
    </div>
  );
};

export default PlaceGrid;
