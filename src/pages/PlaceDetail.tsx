import { useParams, Link } from 'react-router-dom';
import { allPlaces } from '@/data/places';
import { ArrowLeft, Star, MapPin, IndianRupee, Tag, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const sampleReviews = [
  { user: 'Riya Sharma', rating: 5, comment: 'Amazing ambiance and great food! Will visit again.', date: '2 days ago' },
  { user: 'Arjun Mehta', rating: 4, comment: 'Good value for money. Loved the vibe.', date: '1 week ago' },
  { user: 'Priya Patel', rating: 4, comment: 'Nice place to hang out with friends. Service was quick.', date: '2 weeks ago' },
  { user: 'Karan Singh', rating: 5, comment: 'Perfect spot for a chill evening. Highly recommend!', date: '3 weeks ago' },
];

const PlaceDetail = () => {
  const { id } = useParams();
  const place = allPlaces.find(p => p.id === id);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(sampleReviews);
  const [userLat, setUserLat] = useState(19.076);
  const [userLng, setUserLng] = useState(72.8777);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setUserLat(pos.coords.latitude); setUserLng(pos.coords.longitude); },
        () => {}
      );
    }
  }, []);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">Place not found</p>
          <Link to="/" className="text-accent hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  const mapQuery = encodeURIComponent(`${place.name}, ${place.location}, Mumbai`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const distance = getDistance(userLat, userLng, place.lat, place.lng);
  const travelMins = Math.round(distance * 3.5);

  const handleOpenMap = () => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      setReviews(prev => [
        { user: 'You', rating: newRating, comment: newReview, date: 'Just now' },
        ...prev,
      ]);
      setNewReview('');
      setNewRating(5);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header image */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Link
          to="/"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 text-white text-sm font-medium backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="absolute bottom-6 left-6 right-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-2"
            style={{ lineHeight: '1.1' }}
          >
            {place.name}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
            <span className="px-2.5 py-1 rounded-lg bg-white/20 font-semibold">{place.category}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{place.location}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{place.rating} ({place.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Info grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-5 rounded-2xl bg-secondary space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Address</p>
            <p className="text-sm font-semibold text-foreground">{place.address}</p>
          </div>
          <div className="p-5 rounded-2xl bg-secondary space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Budget Range</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />{place.budgetMin} – ₹{place.budgetMax}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-secondary space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Distance & Time</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />{distance.toFixed(1)} km
              <Clock className="w-4 h-4 text-accent ml-1" />~{travelMins} min
            </p>
          </div>
        </motion.div>

        {/* Offers */}
        {place.offers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-bold text-foreground mb-3">Today's Offers</h2>
            <div className="flex flex-wrap gap-2">
              {place.offers.map((o, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                  <Tag className="w-3.5 h-3.5" />{o}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Map link */}
        <button
          onClick={handleOpenMap}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl card-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Maps
        </button>

        {/* Reviews */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-bold text-foreground mb-4">Reviews</h2>

          {/* Add review */}
          <div className="p-5 rounded-2xl border border-border space-y-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setNewRating(n)} className="p-0.5">
                  <Star className={`w-5 h-5 transition-colors ${n <= newRating ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>
            <textarea
              value={newReview}
              onChange={e => setNewReview(e.target.value)}
              placeholder="Write your review..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
            />
            <button
              onClick={handleSubmitReview}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Submit Review
            </button>
          </div>

          {/* Review list */}
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">{r.user}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, n) => (
                    <Star key={n} className={`w-3.5 h-3.5 ${n < r.rating ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaceDetail;
