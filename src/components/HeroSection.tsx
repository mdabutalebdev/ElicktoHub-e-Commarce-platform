'use client';

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchHeroData } from "@/redux/slice/heroSlice";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import LeftBanner from "./LeftBanner";
import { StarRating } from "./StarRating";




const HeroSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { hotCategories, bestPicks } = useSelector(
    (state: RootState) => state.hero
  );

  useEffect(() => {
    dispatch(fetchHeroData());
  }, [dispatch]);

  if (!hotCategories || !bestPicks) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Left Banner */}
          <LeftBanner />

          {/* Right Side */}
           <div className="w-[600px]">
             <Image 
             src="/right banner.webp"
             alt="banner right"
             width={800}
             height={300}
             className="h-[500px] w-[600px] rounded-2xl"
            />
           </div>
        </motion.div>

        {/* Best Picks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 mt-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Best Picks of the Week</h3>
            <Link href="#" className="text-red-500 font-semibold hover:underline">
              Shop More
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestPicks.map((product) => {
              const displayPrice: number = (product as any).newPrice ?? (product as any).price ?? 0;
              return (
                <motion.div
                  key={product.name}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card className="flex items-center space-x-4 p-4 h-50 hover:shadow-lg transition">
                    <Image
                      src={product.image ?? "/placeholder.png"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 hover:text-red-500 transition">
                        {product.name}
                      </h4>
                      <StarRating rating={product.rating ?? 0} />
                      <div className="flex items-center space-x-2 mt-1">
                        {product.oldPrice && (
                          <p className="text-gray-400 line-through">
                            ${product.oldPrice.toFixed(2)}
                          </p>
                        )}
                        <p className="text-red-500 font-bold">
                          ${displayPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
