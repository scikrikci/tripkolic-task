'use client';

import { Star, MapPin, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TourCard({ tour }) {
    const {
        title,
        description,
        discount,
        originalPrice,
        discountedPrice,
        rating,
        image,
        location,
        category
    } = tour;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === tour.id));
    }, [tour.id]);

    const handleAddToFavorites = (e) => {
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav.id !== tour.id);
        } else {
            updatedFavorites = [...favorites, tour];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer select-none
">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div
                    onClick={handleAddToFavorites}
                    className={`absolute top-5 right-5 p-2 rounded-lg cursor-pointer hover:scale-[1.08] active:scale-[0.98] transition-transform delay ${isFavorite ? 'bg-primary-500 hover:bg-primary-600' : 'bg-white hover:bg-slate-100'
                        }`}
                >
                    <Heart className={`size-5 ${isFavorite ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <div className='absolute bottom-2 left-2 bg-white text-gray-900 px-2 py-1 rounded-md text-sm font-semibold'>
                    {category[0].toUpperCase() + category.slice(1)}
                </div>

                {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-white text-primary-500 px-2 py-1 rounded-md text-sm font-semibold">
                        {discount}% OFF
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
                <div className="flex justify-between mb-3">
                    <div className='flex'>
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                            {rating}/5
                        </span>
                    </div>
                    <div className='flex'>
                        <MapPin className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500">{location}</span>

                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-primary-500">
                            ${discountedPrice}
                        </span>
                        {discount > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                                ${originalPrice}
                            </span>
                        )}
                    </div>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}