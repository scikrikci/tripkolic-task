'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { filters, categories, locations } from '@/lib/data';
import FilterSection from './FilterSection';

export default function FilterSidebar({
    isMobile,
    onClose,
    onApply
}) {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedOptionLocation, setSelectedOptionLocation] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const handleReset = () => {
        setSelectedCategory('all');
        setPriceRange([0, 1000]);
        setSelectedThemes([]);
        setSelectedActivities([]);
        setSelectedVehicles([]);
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
        if (isMobile && onClose) onClose();
    };

    const handleOptionClickDropDown = (option) => {
        setSelectedOptionLocation(option);
        setIsOpenDropdown(false);
    };

    return (
        <>
            {isMobile && (
                <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
            )}

            <div className={`bg-white ${isMobile ?
                'fixed inset-y-0 left-0 w-full sm:w-96 p-6 z-50 overflow-y-auto' :
                'h-full overflow-y-auto p-6'}`}
            >
                {isMobile && (
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Filters</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                )}

                <div className="space-y-8">
                    {/* <div className="relative inline-block text-left w-full space-y-3 z-10">
                        <button
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 p-2 bg-gray-50 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            <span className='text-primary-600 font-bold mr-1'>Locations</span>
                            {selectedOptionLocation === 'Locations' ? ' ' : ': ' + selectedOptionLocation}
                        </button>
                        {isOpenDropdown && (
                            <div
                                className="origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                style={{ width: '100%' }}
                            >
                                <div className="py-1">
                                    {locations.map((location) => (
                                        <a
                                            href="#"
                                            key={location.id}
                                            onClick={() => handleOptionClickDropDown(location.name)}
                                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            {location.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div> */}

                    <FilterSection title="Categories">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full text-left px-4 py-2 rounded-md text-sm ${selectedCategory === category.id
                                    ? 'bg-orange-300 text-white'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </FilterSection>

                    <FilterSection title="Price Range">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full mt-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </FilterSection>

                    <FilterSection
                        title="Themes"
                        items={filters.theme}
                        selectedItems={selectedThemes}
                        onToggle={setSelectedThemes}
                    />

                    <FilterSection
                        title="Activities"
                        items={filters.activity}
                        selectedItems={selectedActivities}
                        onToggle={setSelectedActivities}
                    />

                    <FilterSection
                        title="Vehicles"
                        items={filters.vehicle}
                        selectedItems={selectedVehicles}
                        onToggle={setSelectedVehicles}
                    />
                    <FilterSection
                        title="Features"
                        items={filters.features}
                        selectedItems={selectedFeatures}
                        onToggle={setSelectedFeatures}
                    />

                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={handleReset}
                            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500"
                        >
                            Search
                        </button>
                    </div>
                </div >
            </div >
        </>
    );
}