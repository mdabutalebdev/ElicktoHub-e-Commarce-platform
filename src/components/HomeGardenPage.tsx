// src/app/home-garden/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchHomeGardenData } from '@/redux/slice/homeGardenSlice';
import { addItem } from '@/redux/slice/cartSlice';
import { Button } from '@/components/ui/button';
import { ChevronDown, ShoppingCart } from 'lucide-react';

export default function HomeGardenPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, bestsellers, status, error } = useSelector((state: RootState) => state.homeGarden);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHomeGardenData());
    }
  }, [status, dispatch]);

  const filteredBestsellers = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return bestsellers;
    }
    return bestsellers.filter(product => product.category === selectedCategory);
  }, [bestsellers, selectedCategory]);
  
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
      e.stopPropagation(); // Link এ ক্লিক হওয়া থেকে বিরত রাখতে
      e.preventDefault();   // Link এর ডিফল্ট আচরণ বন্ধ করতে
      dispatch(addItem(product));
      alert(`${product.name} added to cart!`);
  };

  if (status === 'loading' || status === 'idle') {
    return <div className="container mx-auto text-center py-40 font-semibold">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="container mx-auto text-center py-40 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Home & Garden</h1>
          <p className="text-sm text-gray-500 mt-1">Home / Home & garden</p>
        </div>

        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {/* All Category Button */}
            <div
              onClick={() => setSelectedCategory('All')}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${!selectedCategory || selectedCategory === 'All' ? 'bg-gray-800 text-white' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                All
              </div>
              <p className="text-sm font-medium text-gray-700">All</p>
            </div>
            {/* Other Categories */}
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`relative w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-200 ${selectedCategory === category.name ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}>
                  <Image src={category.image} alt={category.name} width={50} height={50} objectFit="contain" />
                </div>
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Bestsellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBestsellers.map((product) => (
              <Link key={product.id} href={`/homeGarden/${product.id}`} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center group relative overflow-hidden transition-shadow hover:shadow-xl">
                {product.sale && (
                  <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">-16%</div>
                )}
                <div className="relative w-full h-40 mb-4">
                  <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" className="transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col flex-grow items-center text-center w-full">
                  <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-baseline gap-2 mt-auto">
                    <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    {product.oldPrice && <p className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>}
                  </div>
                </div>
                {/* Add to Cart Button on Hover */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5">
                  <Button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2"/> Add to Cart
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* ... Bottom Text Section অপরিবর্তিত থাকবে ... */}
      </main>
    </div>
  );
}