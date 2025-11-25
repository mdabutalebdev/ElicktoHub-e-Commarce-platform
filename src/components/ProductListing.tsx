'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // next/link ইম্পোর্ট করুন
import toast from 'react-hot-toast'; // react-hot-toast ইম্পোর্ট করুন
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LayoutGrid, SquareStack, X, Star } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchProducts, Product } from '@/redux/slice/productsSlice'; // Product টাইপ ইম্পোর্ট করুন
import { addItem } from '@/redux/slice/cartSlice'; // addItem action ইম্পোর্ট করুন

// ... (ফাইলের উপরের অংশ অপরিবর্তিত থাকবে)
const PRODUCTS_PER_PAGE = 10;
const availableTags = [
  'Electronics', 'Gaming', 'Laptop', 'Apple', 'Audio', 'New', 'Phone', 'Tablet',
];


const ProductListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  // ... (useEffect এবং অন্যান্য স্টেট অপরিবর্তিত থাকবে)
  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, activeTags, priceRange, sortOption]);

  const filteredProducts = useMemo(() => {
    // ... (ফিল্টারিং এবং সর্টিং লজিক অপরিবর্তিত থাকবে)
    if (!products) return [];
    let filtered = [...products];
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    if (activeTags.length > 0) {
      filtered = filtered.filter((p) => p.tags && p.tags.some((tag) => activeTags.includes(tag)));
    }
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortOption) {
      case 'price-asc': return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc': return filtered.sort((a, b) => b.price - a.price);
      case 'name-asc': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default: return filtered;
    }
  }, [products, selectedCategories, activeTags, priceRange, sortOption]);
  
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // ===== হ্যান্ডলার ফাংশন =====
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation(); // Link কম্পোনেন্টের নেভিগেশন বন্ধ করবে
    e.preventDefault(); // বাটনের ডিফল্ট আচরণ বন্ধ করবে
    // Ensure 'sale' property exists for compatibility with homeGardenSlice.Product
    const productWithSale = { 
      ...product, 
      id: Number(product.id), 
      sale: (product as any).sale ?? false,
      oldPrice: product.oldPrice ?? null,
      image: product.image || product.imageUrl || '/fallback-image.png'
    };
    dispatch(addItem(productWithSale));
    toast.success(`${product.name} has been added to cart!`);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setActiveTags([]);
    setPriceRange([0, 2000]);
    setSortOption('featured');
  };
  
  const handleTagRemove = (tag: string) => setActiveTags((prev) => prev.filter((t) => t !== tag));
  const handleCategoryRemove = (cat: string) => setSelectedCategories((prev) => prev.filter((c) => c !== cat));

  // ... (Loading/Error state অপরিবর্তিত থাকবে)
  if (status === 'loading' || status === 'idle') return <div className="container mx-auto text-center py-20 font-semibold">Loading Products...</div>;
  if (status === 'failed') return <div className="container mx-auto text-center py-20 text-red-500">Error: {error || 'Failed to load products.'}</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8 h-fit">
          {/* ... (সাইডবারের সব কোড অপরিবর্তিত থাকবে) */}
           {/* Category Filter */}
           <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
            <div className="space-y-3">
              {uniqueCategories.map((cat) => (
                <div key={cat} className="flex items-center">
                  <Checkbox id={cat} checked={selectedCategories.includes(cat)} onCheckedChange={(checked) => setSelectedCategories((prev) => checked ? [...prev, cat] : prev.filter((c) => c !== cat))} />
                  <label htmlFor={cat} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">{cat}</label>
                </div>
              ))}
            </div>
          </div>
          {/* Price Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Price</h3>
            <Slider value={priceRange} max={2000} step={50} onValueChange={setPriceRange} />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          {/* Tags Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button key={tag} variant={activeTags.includes(tag) ? 'default' : 'outline'} size="sm" onClick={() => setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}>{tag}</Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          {/* Top Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-wrap justify-between items-center gap-4">
             {/* ... (টপ কন্ট্রোলের সব কোড অপরিবর্তিত থাকবে) */}
             <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-medium">Active Filters:</span>
              {selectedCategories.map((cat) => (<span key={cat} className="flex items-center bg-gray-100 text-xs px-2 py-1 rounded-full">{cat}<X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleCategoryRemove(cat)} /></span>))}
              {activeTags.map((tag) => (<span key={tag} className="flex items-center bg-gray-100 text-xs px-2 py-1 rounded-full">{tag}<X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleTagRemove(tag)} /></span>))}
              {(selectedCategories.length > 0 || activeTags.length > 0) && (<Button variant="ghost" className="text-sm text-red-500" onClick={handleClearAll}>Clear All</Button>)}
            </div>
            <div className="flex items-center gap-4">
              <Select onValueChange={setSortOption} defaultValue="featured">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Featured" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Sort by: Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
              <Button variant={isGrid ? 'default' : 'outline'} size="icon" onClick={() => setIsGrid(true)}><LayoutGrid /></Button>
              <Button variant={!isGrid ? 'default' : 'outline'} size="icon" onClick={() => setIsGrid(false)}><SquareStack /></Button>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className={isGrid ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                // ===== প্রোডাক্ট কার্ডের পরিবর্তন এখানে =====
                <Link key={product.id} href={`/product/${product.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    <div className="relative w-full h-48">
                      <Image
                        src={product.image || product.imageUrl || '/fallback-image.png'}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${product.badge.toLowerCase() === 'sale' ? 'bg-red-500' : 'bg-blue-500'}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-red-500 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < (product.rating ?? 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-1.5">({product.rating ?? 0})</span>
                      </div>

                      <div className="flex items-baseline mb-3">
                        <span className="text-lg font-bold text-gray-900 mr-2">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (<span className="text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>)}
                      </div>

                      <Button
                        className="w-full mt-auto"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
                // ===== পরিবর্তন শেষ =====
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No products found matching your filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} variant={currentPage === i + 1 ? 'default' : 'outline'} size="sm" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductListing;