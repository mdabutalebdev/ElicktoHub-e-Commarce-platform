'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { removeItem, increaseQuantity, decreaseQuantity } from '@/redux/slice/cartSlice';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  
  // Hydration error এড়ানোর জন্য এই স্টেটটি জরুরি
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);
  
  // ক্লায়েন্ট সাইডে রেন্ডার হওয়ার আগে লোডিং স্টেট দেখানো হচ্ছে
  if (!isMounted) {
    return (
      <div className="container mx-auto text-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg font-semibold">Loading Cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <div className="hidden md:grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-3 mb-4 text-sm uppercase">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
              </div>

              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b pb-4 last:border-b-0">
                    {/* Product Details */}
                    <div className="col-span-6 md:col-span-3 flex items-center gap-4">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-md flex-shrink-0">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" className="p-2" />
                      </div>
                      <div>
                        <Link href={`/products/${item.id}`} className="font-semibold text-gray-800 hover:text-red-500">{item.name}</Link>
                        <button onClick={() => dispatch(removeItem(item.id))} className="text-xs text-gray-500 hover:text-red-500 mt-1 flex items-center">
                          <X size={12} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 md:col-span-1 text-center">
                      <span className="md:hidden text-xs text-gray-500 mr-2">Price: </span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 md:col-span-1 flex items-center justify-center border rounded-md">
                      <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={14}/></button>
                      <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={14}/></button>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 md:col-span-1 text-right">
                      <span className="md:hidden text-xs text-gray-500 mr-2">Subtotal: </span>
                      <span className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Totals & Coupon */}
            <div className="lg:sticky top-28 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Cart Totals</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-500">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600">
                  Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              
              <div className="mt-6">
                 <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                 <div className="flex gap-2">
                    <Input id="coupon" placeholder="Enter coupon"/>
                    <Button variant="outline">Apply</Button>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <ShoppingCart size={64} className="mx-auto text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}