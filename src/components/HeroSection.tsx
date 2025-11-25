'use client';

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchHeroData } from "@/redux/slice/heroSlice";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import { StarRating } from "./StarRating";
import LeftBanner from "./LeftBanner";

const HeroSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bestPicks } = useSelector(
    (state: RootState) => state.hero
  );

  useEffect(() => {
    dispatch(fetchHeroData());
  }, [dispatch]);

  if (!bestPicks) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="bg-gray-100 py-5">
      <div className="container mx-auto px-4">

        {/* ✅ Full Width Slider */}
        <div className="w-full">
          <LeftBanner />
        </div>

        {/* ✅ Best Picks Section */}
        <div className="bg-white rounded-2xl p-6 mt-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Best Picks of the Week</h3>
            <Link href="#" className="text-red-500 font-semibold hover:underline">
              Shop More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestPicks.map((product) => {
              const displayPrice: number =
                (product as any).newPrice ??
                (product as any).price ??
                0;

              return (
                <Card
                  key={product.name}
                  className="flex items-center gap-4 p-4 hover:shadow-lg transition"
                >
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

                    <div className="flex items-center gap-2 mt-1">
                      {(product as any).oldPrice && (
                        <p className="text-gray-400 line-through">
                          ${Number((product as any).oldPrice).toFixed(2)}
                        </p>
                      )}
                      <p className="text-red-500 font-bold">
                        ${Number(displayPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
