'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { filters, categories } from '@/lib/data';
import FilterSection from './FilterSection';

// Initial filter state'leri için sabitler
const INITIAL_FILTERS = {
    category: 'all',
    priceRange: [0, 1000],
    themes: [],
    activities: [],
    vehicles: [],
    features: [],
};

export default function FilterSidebar({ isMobile, onClose, onApply }) {
    // State'leri tek bir nesnede toplamak yerine ayrı tutuyoruz (daha okunabilir)
    const [selectedCategory, setSelectedCategory] = useState(INITIAL_FILTERS.category);
    const [priceRange, setPriceRange] = useState(INITIAL_FILTERS.priceRange);
    const [selectedThemes, setSelectedThemes] = useState(INITIAL_FILTERS.themes);
    const [selectedActivities, setSelectedActivities] = useState(INITIAL_FILTERS.activities);
    const [selectedVehicles, setSelectedVehicles] = useState(INITIAL_FILTERS.vehicles);
    const [selectedFeatures, setSelectedFeatures] = useState(INITIAL_FILTERS.features);

    // Filtre bölümleri için konfigürasyon
    const filterSections = [
        {
            title: 'Themes',
            items: filters.theme,
            state: selectedThemes,
            setState: setSelectedThemes
        },
        {
            title: 'Activities',
            items: filters.activity,
            state: selectedActivities,
            setState: setSelectedActivities
        },
        {
            title: 'Vehicles',
            items: filters.vehicle,
            state: selectedVehicles,
            setState: setSelectedVehicles
        },
        {
            title: 'Features',
            items: filters.features,
            state: selectedFeatures,
            setState: setSelectedFeatures
        }
    ];

    const handleReset = () => {
        // Tüm state'leri başlangıç değerlerine sıfırla
        setSelectedCategory(INITIAL_FILTERS.category);
        setPriceRange(INITIAL_FILTERS.priceRange);
        setSelectedThemes(INITIAL_FILTERS.themes);
        setSelectedActivities(INITIAL_FILTERS.activities);
        setSelectedVehicles(INITIAL_FILTERS.vehicles);
        setSelectedFeatures(INITIAL_FILTERS.features);

        // Sıfırlanmış değerleri hemen uygula
        onApply(INITIAL_FILTERS);
        isMobile && onClose?.();
    };

    const handleApply = () => {
        onApply({
            category: selectedCategory,
            priceRange,
            themes: selectedThemes,
            activities: selectedActivities,
            vehicles: selectedVehicles,
            features: selectedFeatures
        });
        isMobile && onClose?.();
    };

    const handlePriceChange = (value) => {
        setPriceRange([0, parseInt(value)]);
    };

    return (
        <>
            {isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-50"
                    onClick={onClose}
                    role="presentation"
                />
            )}

            <div className={`bg-white ${isMobile ?
                'fixed inset-y-0 left-0 w-full sm:w-96 p-6 z-50 overflow-y-auto' :
                'h-full overflow-y-auto p-6'}`}
            >
                {isMobile && (
                    <header className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Filters</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            aria-label="Close filters"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </header>
                )}

                <div className="space-y-8">
                    {/* Categories Section */}
                    <FilterSection title="Categories">
                        {categories.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setSelectedCategory(id)}
                                className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors
                  ${selectedCategory === id
                                        ? 'bg-primary-500 text-white'
                                        : 'hover:bg-gray-100'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </FilterSection>

                    {/* Price Range Section */}
                    <FilterSection title="Price Range">
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className="w-full mt-2"
                                aria-label="Price range slider"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* Dinamik Filtre Bölümleri */}
                    {filterSections.map(({ title, items, state, setState }) => (
                        <FilterSection
                            key={title}
                            title={title}
                            items={items}
                            selectedItems={state}
                            onToggle={setState}
                        />
                    ))}

                    {/* Action Butonları */}
                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={handleReset}
                            className="flex-1 border border-gray-300 py-2 rounded-lg 
                hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 bg-primary-500 text-white py-2 rounded-lg
                hover:bg-primary-600 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}