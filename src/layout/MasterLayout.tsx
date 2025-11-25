'use client';

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Search, Phone, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { RootState } from "@/redux/store"; // আপনার RootState টাইপের সঠিক পাথ

// ===== ডেটা এবং কনস্ট্যান্ট =====
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Electronics", href: "/electronics" },
  { name: "Home & Garden", href: "/homeGarden" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const topBarLinksLeft = [
    { name: "About Us", href: "/about" },
    { name: "Our Partners", href: "/partners" },
    { name: "Work With Us", href: "/work-with-us" },
];

const topBarLinksRight = [
    { name: "Track Your Order", href: "/track-order" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
];

const userLinks = [
    { name: "Wishlist", href: "/wishlist", icon: <Heart size={20} className="mr-2" /> },
    { name: "Login / Register", href: "/auth", icon: <User size={20} className="mr-2" /> },
];

 
const MasterLayout = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redux store theke card er data 
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // card er total item count
  const totalItems = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0), 
    [cartItems]
  );
  const totalPrice = useMemo(() => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
    [cartItems]
  );

  // Active path check
  const isActive = (href: string) => {
   
    if (href === "/") return pathname === href;
  
    return pathname.startsWith(href);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-white text-black text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <nav className="hidden md:flex space-x-6">
              {topBarLinksLeft.map(link => (
                  <Link key={link.href} href={link.href} className="hover:text-gray-300 transition">{link.name}</Link>
              ))}
            </nav>
            <nav className="flex space-x-6">
              {topBarLinksRight.map(link => (
                  <Link key={link.href} href={link.href} className="hover:text-gray-300 transition">{link.name}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
                 <h3 className="text-2xl font-extrabold">ElictoHub</h3>
            </Link>
         
            {/* Search Bar */}
            <div className="hidden lg:flex flex-grow max-w-xl mx-8">
              <div className="relative w-full">
                <input type="search" placeholder="Search for products" className="w-full h-12 pl-5 pr-14 rounded-full border-0 focus:ring-0 text-gray-600 bg-white" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center transition">
                  <Search className="text-black" />
                </button>
              </div>
            </div>

            {/* Header Actions (Desktop) */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={24} />
                <div>
                  <div className="text-sm">Hotline 24/7</div>
                  <div className="font-semibold">(505) 285-5028</div>
                </div>
              </div>
              <Link href="/cart" className="flex items-center space-x-3">
                <ShoppingCart size={28} />
                <div>
                  <div className="font-bold">${totalPrice.toFixed(2)}</div>
                  <div className="text-sm text-gray-300">{totalItems} items</div>
                </div>
              </Link>
            </div>

            {/* Header Actions (Mobile) */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link href="/cart" className="text-white relative">
                <ShoppingCart size={28} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e5495f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white text-black border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <nav className="hidden lg:flex space-x-6 font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`px-3 py-2 transition hover:text-gray-200 ${isActive(link.href) ? "underline underline-offset-4" : ""}`}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center space-x-6">
              {userLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center hover:text-gray-200 transition">
                  {link.icon} {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Search */}
            <div className="relative w-full mb-4">
              <input type="search" placeholder="Search for products" className="w-full h-11 pl-4 pr-12 rounded-full border-gray-300 focus:ring-pink-500 focus:border-pink-500" />
              <button className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-[#e5495f] rounded-full">
                <Search className="text-white" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobileMenu}
                  className={`p-2 rounded-md transition hover:text-[#e5495f] ${isActive(link.href) ? "text-[#e5495f] font-bold" : "text-gray-700 font-semibold"}`}>
                  {link.name}
                </Link>
              ))}
              <hr className="my-2" />
              <Link href="/cart" onClick={closeMobileMenu} className="flex items-center text-gray-700 font-semibold hover:text-[#e5495f] p-2 rounded-md transition">
                <ShoppingCart size={20} className="mr-2" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-[#e5495f] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {userLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="flex items-center text-gray-700 font-semibold hover:text-[#e5495f] p-2 rounded-md transition">
                      {link.icon} {link.name}
                  </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default MasterLayout;