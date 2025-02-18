import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Shoe } from '../lib/types';
import { Loader2 } from 'lucide-react';
import { getRandomShoes } from '../lib/shoePicker';

interface PublicCollectionViewProps {
  shoes: Shoe[];
  loading: boolean;
}

export function PublicCollectionView({ shoes, loading }: PublicCollectionViewProps) {
  const randomShoes = getRandomShoes(shoes, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-byu-navy" />
      </div>
    );
  }

  if (shoes.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">No shoes in the collection yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {randomShoes.map((shoe) => (
        <div key={shoe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={shoe.image_url}
              alt={shoe.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-byu-navy">{shoe.name}</h3>
            <p className="text-gray-600">{shoe.brand} {shoe.model}</p>
            
            <div className="flex gap-2 mt-2">
              {shoe.colors.map((color, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm rounded-full bg-gray-100"
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-sm text-gray-600">
                Last worn: {shoe.last_worn 
                  ? formatDistanceToNow(new Date(shoe.last_worn), { addSuffix: true })
                  : 'Never'}
              </div>
              <div className="text-sm text-gray-600">
                Last cleaned: {shoe.last_cleaned
                  ? formatDistanceToNow(new Date(shoe.last_cleaned), { addSuffix: true })
                  : 'Never'}
              </div>
              <div className="text-sm text-gray-600">
                Worn {shoe.wear_count} times
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}