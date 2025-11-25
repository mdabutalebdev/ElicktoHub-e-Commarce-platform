'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BatteryCharging, VolumeX } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchProducts } from '@/redux/slice/productsSlice';

const FullShowcase: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: allProducts, status } = useSelector((state: RootState) => state.products);

  // Fetch product data only when idle
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

const featuredProducts = allProducts
  .slice(0, 10)
  .map((p) => ({
    ...p,
    id: p.id.toString(),                  // convert number to string
    href: p.href || "#",                  // fallback href
    image: p.image || p.imageUrl || "/images/default.jpg", // fallback image
    rating: typeof p.rating === 'number' ? p.rating : 0,   // ensure rating is a number
  }));



  // Static sidebar content
  const articles = [
    { title: 'Best Gaming Laptop Models', date: '22 Nov 2024', comments: 0, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/best-gaming-laptop-model-entry-header-70x60.jpg', href: '#' },
    { title: 'How to choose a HI-FI stereo', date: '14 Nov 2024', comments: 0, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/how-to-choose-a-hi-fi-stereo-system-entry-header-70x60.jpg', href: '#' },
    { title: 'Logitech POP Keys', date: '11 Nov 2024', comments: 0, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/logitech-pop-keys-entry-header-70x60.jpg', href: '#' },
  ];

  const products = [
    { name: 'Cat Teepee Tent', oldPrice: 92, newPrice: 69, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/mp-cat-tent-1-263x300.jpg.webp', href: '#' },
    { name: 'Wattle Dress', oldPrice: 53, newPrice: 45, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/w-bcs-dresses-8-1-1-88x100.jpg.webp', href: '#' },
    { name: 'Forest Knitted Dress', oldPrice: 56, newPrice: 45, image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/w-bcs-dresses-2-1-1-88x100.jpg.webp', href: '#' },
  ];

  const topAppliances = [
    { name: 'Air Fryer', image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/03/lg-artcool-ac12bq-1-65x74.jpg', price: '$129.99' },
    { name: 'Smart Vacuum', image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/03/tefal-perfectmix-1-65x74.jpg', price: '$199.99' },
    { name: 'Coffee Machine', image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/03/hansa-zwm-556-bh-1-65x74.jpg', price: '$89.99' },
  ];

  return (
    <section className="bg-[#F8F9FA] py-12">
      <div className="container mx-auto px-4 grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <aside className="space-y-8 lg:col-span-1">
          
          {/* Promo Banner */}
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl group">
            <Image src="https://m.media-amazon.com/images/I/7165scHTM4L._AC_SL1500_.jpg" alt="Alby Urbanears" width={400} height={600} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col p-8 bg-gradient-to-b from-sky-400/60 via-sky-400/20 to-transparent">
              <div className="text-slate-800">
                <h2 className="text-5xl font-extrabold leading-tight">Alby <br /> Urbanears</h2>
                <p className="mt-2 text-lg font-medium">Get ready to impressive sound</p>
              </div>
              <div className="mt-8 flex space-x-4">
                <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#2D3A54] rounded-full text-white shadow-lg">
                  <BatteryCharging size={24} />
                  <span className="font-semibold mt-1 text-sm">Play Time</span>
                  <span className="text-sm font-light">15 Hours</span>
                </div>
                <div className="flex flex-col items-center justify-center w-28 h-28 bg-[#2D3A54] rounded-full text-white shadow-lg">
                  <VolumeX size={24} />
                  <span className="font-semibold mt-1 text-sm">ANC</span>
                  <span className="text-sm font-light">-48dB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Last articles</h2>
            <div className="space-y-4">
              {articles.map((a, i) => (
                <Link key={a.title} href={a.href}>
                  <div className={`flex items-center space-x-4 group ${i < articles.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                    <Image src={a.image} alt={a.title} width={64} height={64} className="rounded-xl object-cover" />
                    <div>
                      <h3 className="font-semibold text-gray-700 group-hover:text-red-500">{a.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{a.date} · {a.comments} comments</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Latest products */}
          <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Latest products</h2>
            <div className="space-y-5">
              {products.map(p => (
                <Link key={p.name} href={p.href}>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Image src={p.image} alt={p.name} width={56} height={56} className="object-contain" />
                      <h3 className="font-semibold text-gray-700 group-hover:text-red-500">{p.name}</h3>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-gray-400 line-through text-sm">${p.oldPrice.toFixed(2)}</p>
                      <p className="font-bold text-red-500">${p.newPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* Featured Products */}
          <Tabs defaultValue="popular">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Featured products</h2>
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="most-viewed">Most Viewed</TabsTrigger>
                <TabsTrigger value="top-selling">Top Selling</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="popular">
              {status === 'loading' && <div className="text-center p-8">Loading...</div>}
              {status === 'succeeded' && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                  {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
              {status === 'failed' && <div className="text-center p-8 text-red-500">Failed to load.</div>}
            </TabsContent>
          </Tabs>

          {/* Bottom Section */}
          <div className="grid xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ProductCard product={{ id: 'cat-teepee-tent', name: 'Cat Teepee Tent', category: 'Textiles', image: 'https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/12/mp-cat-tent-1-212x242.jpg', rating: 0, price: 69, href: '#' }} />
              </div>
              <div className="md:col-span-2 rounded-2xl overflow-hidden">
                <Image src="https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2025/02/hotspot-carusel-cat-tent-1-opt.jpg" alt="Cat in a tent" width={800} height={400} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="xl:col-span-1">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-lg">Top 100 appliances</CardTitle>
                  <Link href="#" className="text-sm text-red-500 font-semibold hover:underline">Shop More</Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topAppliances.map(item => (
                    <Link key={item.name} href="#" className="flex items-center space-x-4 group">
                      <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-lg bg-gray-100 p-1" />
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-red-500">{item.name}</h4>
                        <p className="text-sm font-bold text-gray-800">{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default FullShowcase;
