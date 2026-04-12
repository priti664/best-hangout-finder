import { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchFilters from '@/components/SearchFilters';
import PlaceGrid from '@/components/PlaceGrid';
import { allPlaces, nearbyAreas } from '@/data/places';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userLat, setUserLat] = useState<number | undefined>();
  const [userLng, setUserLng] = useState<number | undefined>();
  const [userLocationName, setUserLocationName] = useState('Mumbai');
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
          setUserLocationName('Mumbai (detected)');
        },
        () => {
          setUserLat(19.076);
          setUserLng(72.8777);
        }
      );
    }
  }, []);

  const filteredPlaces = useMemo(() => {
    let results = allPlaces;
    const q = searchQuery.toLowerCase().trim();

    if (q) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      results = results.filter(p => p.category === selectedCategory);
    }

    if (selectedLocation) {
      results = results.filter(p => p.location === selectedLocation);
    }

    const min = minBudget ? parseInt(minBudget) : 0;
    const max = maxBudget ? parseInt(maxBudget) : Infinity;
    if (min > 0 || max < Infinity) {
      results = results.filter(p => p.budgetMax >= min && p.budgetMin <= max);
    }

    // Smart fallback: if too few results, add nearby area results
    if (results.length < 5 && selectedLocation) {
      const nearby = nearbyAreas[selectedLocation] || [];
      const existingIds = new Set(results.map(p => p.id));
      let extras = allPlaces.filter(p => {
        if (existingIds.has(p.id)) return false;
        if (!nearby.includes(p.location)) return false;
        if (selectedCategory && p.category !== selectedCategory) return false;
        if ((min > 0 || max < Infinity) && (p.budgetMax < min || p.budgetMin > max)) return false;
        return true;
      });
      results = [...results, ...extras.slice(0, 10 - results.length)];
    }

    return results;
  }, [searchQuery, selectedCategory, selectedLocation, minBudget, maxBudget]);

  const handleExplore = () => {
    filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userLocation={userLocationName} />
      <Hero onExplore={handleExplore} />

      <div ref={filtersRef} className="container mx-auto px-4 py-10 space-y-8">
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minBudget={minBudget}
          maxBudget={maxBudget}
          onMinBudgetChange={setMinBudget}
          onMaxBudgetChange={setMaxBudget}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredPlaces.length}</span> places
          </p>
        </div>

        <PlaceGrid places={filteredPlaces} userLat={userLat} userLng={userLng} />
      </div>
    </div>
  );
};

export default Index;
