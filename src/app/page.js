'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FilterSidebar from '@/components/FilterSidebar';
import TourCard from '@/components/TourCard';
import { tours } from '@/lib/data';

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState(tours);

  const handleFilterApply = (filters) => {
    const { category, priceRange, themes, activities, vehicles, features } = filters;

    const filtered = tours.filter(tour => {
      const categoryMatch = category === 'all' || tour.category === category;
      const themeMatch = themes.length === 0 || themes.includes(tour.theme);
      const activityMatch = activities.length === 0 ||
        activities.some(act => tour.activity.includes(act));
      const vehicleMatch = vehicles.length === 0 || vehicles.includes(tour.vehicle);
      const featuresMatch = features.length === 0 || features.every(feat => tour.features.includes(feat));
      const priceMatch = tour.discountedPrice >= priceRange[0] &&
        tour.discountedPrice <= priceRange[1];

      return categoryMatch && themeMatch && activityMatch && vehicleMatch && priceMatch && featuresMatch;
    });

    setFilteredTours(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
          <FilterSidebar
            isMobile={false}
            onApply={handleFilterApply}
          />
        </div>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <FilterSidebar
            isMobile={true}
            onClose={() => setIsMobileSidebarOpen(false)}
            onApply={handleFilterApply}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 relative">
          <div className="fixed bottom-4 right-4 p-3 rounded-lg bg-slate-400 z-40 text-white">{filteredTours.length}</div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.length > 0 ? (
                filteredTours.map(tour => <TourCard key={tour.id} tour={tour} />)
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No tours found with current filters
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}