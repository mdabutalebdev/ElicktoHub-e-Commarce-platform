'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type BannerSlide = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
};

const bannerSlides: BannerSlide[] = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfifUoTA6gaG3b4m1iXYsFonOycgXutOb-Q&s",
    title: "Galaxy S24 Ultra",
    subtitle: "Experience the power of AI in your hands",
    buttonText: "Shop Now",
    bgColor: "#E6F0FF",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAZztgy1kFajZKdBK6yRsbA2V9NYj0ZBILAg&s",
    title: "MacBook Pro M3",
    subtitle: "Unleash performance for creators",
    buttonText: "Buy Now",
    bgColor: "#F4F4F8",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKV0X0ghMlzFJBJu2Zo0eHRB8he7V3_yKoQ&s",
    title: "Sony WH-1000XM5",
    subtitle: "Immerse yourself in pure sound",
    buttonText: "Explore",
    bgColor: "#F0F6F0",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgtXTe3LKkL9FGSyBqKFi5HjtduSlprwXzA&s",
    title: "Galaxy Watch 6 Classic",
    subtitle: "Your fitness and style companion",
    buttonText: "Discover",
    bgColor: "#FFF1F1",
  },
];


const LeftBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = bannerSlides[currentIndex];

  return (
    <Card
      className="lg:col-span-3 rounded-2xl p-0 relative min-h-[500px] overflow-hidden"
      style={{ backgroundColor: currentSlide.bgColor }}
    >
      <CardContent className="flex flex-col justify-between h-full relative p-8">
        {/* Text Content */}
        <div className="z-10 relative">
          <p className="text-gray-600">{currentSlide.subtitle}</p>
          <h1 className="text-4xl font-bold text-gray-800 mt-2 leading-tight">
            {currentSlide.title}
          </h1>
          <Link href="/">
            <Button className="mt-8 bg-white text-gray-800 hover:bg-gray-200">
              {currentSlide.buttonText}
            </Button></Link>
        </div>

        {/* Full Image */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover opacity-70"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Dots */}
        <div className="absolute bottom-6 left-8 z-20 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${index === currentIndex
                  ? "w-6 h-2 bg-gray-800 rounded-full"
                  : "w-2 h-2 bg-gray-400 rounded-full"
                }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeftBanner;
