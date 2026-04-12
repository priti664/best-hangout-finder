import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero = ({ onExplore }: HeroProps) => {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 md:py-28">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-emerald-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Student-friendly hangout spots
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight text-balance mb-5">
            Find Your Next Hangout Place
          </h1>

          <p className="text-lg md:text-xl text-white/70 text-pretty mb-8 max-w-lg leading-relaxed">
            Chill vibes 😎 Explore cafes, parks, malls & more within your budget across Mumbai.
          </p>

          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-400 text-emerald-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:bg-emerald-300 transition-colors"
          >
            Explore Nearby
            <ArrowRight className="w-4.5 h-4.5" />
          </motion.button>
        </motion.div>

        {/* Decorative orb */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
