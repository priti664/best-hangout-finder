import { motion } from 'framer-motion';
import { Star, MapPin, Tag, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Place } from '@/types/place';

interface PlaceCardProps {
  place: Place;
  index: number;
  userLat?: number;
  userLng?: number;
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getTravelTime(km: number): string {
  const mins = Math.round(km * 3.5);
  return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

const PlaceCard = ({ place, index, userLat, userLng }: PlaceCardProps) => {
  const distance = userLat && userLng
    ? getDistance(userLat, userLng, place.lat, place.lng)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/place/${place.id}`}
        className="group block rounded-2xl overflow-hidden card-gradient shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={place.image}
            alt={place.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop';
            }}
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
            {place.category}
          </div>
          {place.offers[0] && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {place.offers[0]}
            </div>
          )}
        </div>

        <div className="p-4 space-y-2.5">
          <h3 className="text-base font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
            {place.name}
          </h3>

          <div className="flex items-center gap-1.5 text-white/60 text-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{place.location}</span>
            {distance !== null && (
              <span className="ml-auto shrink-0 text-emerald-400 text-xs font-medium">
                {distance.toFixed(1)} km · {getTravelTime(distance)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm font-semibold">{place.rating}</span>
              <span className="text-xs text-white/40">({place.reviewCount})</span>
            </div>
            <div className="flex items-center gap-0.5 text-emerald-300 text-sm font-semibold">
              <IndianRupee className="w-3.5 h-3.5" />
              {place.budgetMin}–{place.budgetMax}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlaceCard;
