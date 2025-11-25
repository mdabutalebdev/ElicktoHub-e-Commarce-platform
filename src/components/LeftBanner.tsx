'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type BannerSlide = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
};

const bannerSlides: BannerSlide[] = [
  {
    image: "/banner one.webp",
    title: "Xiaomi TV S pro mini",
    subtitle: "Experience the power of AI in your hands",
    buttonText: "Shop Now",
  },
  {
    image: "/banner-two.jpg",
    title: "Xiaomi 15T pro",
    subtitle: "Unleash performance for creators",
    buttonText: "Buy Now",
  },
  {
    image: "/banner-four.jpg",
    title: "Vivo V60 5G",
    subtitle: "Immerse yourself in pure sound",
    buttonText: "Explore",
  },
];

const LeftBanner = () => {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full custom-swiper"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10">
                <p className="text-white text-lg">{slide.subtitle}</p>
                <h1 className="text-white text-4xl font-bold mt-2">
                  {slide.title}
                </h1>
                <Link href="/">
                  <Button className="mt-6 bg-white text-black hover:bg-gray-200 w-fit">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* White Pagination Style */}
      <style jsx global>{`
        .custom-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .custom-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default LeftBanner;
