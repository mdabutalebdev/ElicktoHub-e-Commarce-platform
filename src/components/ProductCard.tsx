'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  href: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category?: string;
  badge?: string;
  badgeColor?: 'green' | 'red';
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, view = 'grid' }) => {
  const badgeColorClass = product.badgeColor === 'green' ? 'bg-green-500' : 'bg-red-500';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Card className={`overflow-hidden shadow-sm hover:shadow-lg transition-shadow group ${view === 'list' ? 'flex' : ''}`}>
      <Link href={product.href} className={`w-full ${view === 'list' ? 'flex' : ''}`}>
        <div className={`relative ${view === 'list' ? 'w-1/3 flex-shrink-0' : 'w-full aspect-square'}`}>
          <div className="bg-gray-100 flex items-center justify-center p-4 h-full">
            <Image
              src={product.image}
              alt={product.name}
              width={view === 'grid' ? 180 : 120}
              height={view === 'grid' ? 180 : 120}
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          {product.badge && (
            <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${badgeColorClass}`}>
              {product.badge}
            </div>
          )}
        </div>

        <CardContent className={`p-4 flex flex-col ${view === 'list' ? 'w-2/3 justify-between' : 'items-center text-center w-full'}`}>
          <div>
            {product.category && <p className={`text-sm text-gray-500 ${view === 'list' ? 'text-left' : ''}`}>{product.category}</p>}
            <h3 className={`font-semibold text-gray-800 mt-1 ${view === 'list' ? 'text-left' : ''}`}>{product.name}</h3>
          </div>

          <div>
             <div className={`flex my-2 ${view === 'list' ? 'justify-start' : 'justify-center'}`}>
               <StarRating rating={product.rating} />
             </div>
             <div className={`flex items-center space-x-2 mb-3 ${view === 'list' ? 'justify-start' : 'justify-center'}`}>
               {product.oldPrice && <p className="text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>}
               <p className="font-bold text-lg text-gray-800">${product.price.toFixed(2)}</p>
             </div>
          </div>
          
          <Button onClick={handleAddToCart} size="sm" className="w-full mt-auto">
            Add to Cart
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};