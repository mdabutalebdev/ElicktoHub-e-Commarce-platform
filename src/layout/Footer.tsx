'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 pt-16 pb-6 text-gray-700 relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">

                    {/* Column 1: Logo and Description */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4 relative w-38 h-8">
                            
                                <Image
                                    src="https://woodmart.xtemos.com/marketplace2/wp-content/uploads/sites/21/2024/03/logo.svg"
                                    alt="Grabit Logo"
                                    width={112}
                                    height={32}
                                    style={{ objectFit: 'contain' }}
                                />
                        </Link>
                        <p className="text-sm leading-relaxed mb-4 max-w-sm">
                            Grabit is the biggest market of grocery products. Get your daily needs from our store.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button asChild variant="ghost" className="p-0 h-auto">
                                <Link href="#" className="w-32 h-10 relative">
                                    <Image
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3t5ClBSn5x6jVmKjr0GXbWXyS8JDzN708g&s"
                                        alt="Get it on Google Play"
                                        width={150}
                                        height={50}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Link>
                            </Button>

                            <Button asChild variant="ghost" className="p-0 h-auto">
                                <Link href="#" className="w-32 h-10 relative">
                                    <Image
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5DMZw6-UkhFMGXYK9_sBvrcy2AGkJnf4L9w&s"
                                        alt="Download on the App Store"
                                        width={150}
                                        height={50}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Link>
                            </Button>
                        </div>

                    </div>

                    {/* Column 2: Category */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-5">Category</h3>
                        <ul className="space-y-3 text-sm">
                            {['Dairy & Milk', 'Snack & Spice', 'Fast Food', 'Juice & Drinks', 'Bakery', 'Seafood'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-green-600 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-5">Company</h3>
                        <ul className="space-y-3 text-sm">
                            {['About us', 'Delivery', 'Legal Notice', 'Terms & conditions', 'Secure payment', 'Contact us'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-green-600 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Account */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-5">Account</h3>
                        <ul className="space-y-3 text-sm">
                            {['Sign In', 'View Cart', 'Return Policy', 'Become a Vendor', 'Affiliate Program', 'Payments'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-green-600 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Contact */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-5">Contact</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
                                <span>254B Broadodud Maple Court, Madisonville KY 4783, USA</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
                                <span>+00 9079543200</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
                                <span>example@email.com</span>
                            </div>
                            <div className="flex space-x-3 mt-4">
                                {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                                    <Link key={idx} href="#" className="h-9 w-9 flex items-center justify-center bg-gray-200 hover:bg-green-600 hover:text-white rounded-full transition-colors">
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
                    <p className="mb-4 md:mb-0">
                        Copyright &copy; <Link href="/" className="hover:text-green-600 transition-colors">Grabit.zill</Link> all rights reserved. Powered by Grabit.
                    </p>
                    <div className="flex space-x-2">
                        <div className="">
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1xp2k2aaPWt07q9BPw87uhay4XbiYFLnYuQ6v8_0VckT8ISlybjV91qUs1qzagiQSnw&usqp=CAU"
                                alt="Payment Methods"
                                width={700}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top */}
            <Button
                variant="default"
                size="icon"
                className="fixed bottom-6 right-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full h-10 w-10 z-50"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                ↑
            </Button>
        </footer>
    );
};

export default Footer;
