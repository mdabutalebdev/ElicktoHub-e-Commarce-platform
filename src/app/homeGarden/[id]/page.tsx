// src/app/products/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchHomeGardenData } from '@/redux/slice/homeGardenSlice';
import { addItem } from '@/redux/slice/cartSlice';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id } = params;

  const { bestsellers, status } = useSelector((state: RootState) => state.homeGarden);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHomeGardenData());
    }
  }, [status, dispatch]);

  const product = bestsellers.find(p => p.id === Number(id));

  if (status === 'loading' || status === 'idle') {
    return <div className="text-center py-40 font-semibold">Loading Product...</div>;
  }

  if (!product) {
    return <div className="text-center py-40 font-semibold">Product not found.</div>;
  }
  
  const handleAddToCart = () => {
    dispatch(addItem(product));
    // Optional: Show a success notification
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/homeGarden" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home & Garden
          </Link>

          <div className="bg-white p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="relative w-full h-80 md:h-96 rounded-lg bg-gray-100 flex items-center justify-center">
              <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" className="p-8" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-2">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                A brief yet compelling description of the product goes here. Highlighting its key features, materials, and why it's a must-have for any modern home.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                {product.oldPrice && (
                  <p className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>
                )}
              </div>
              <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}