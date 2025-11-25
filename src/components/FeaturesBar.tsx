import React from 'react';
import { MapPin, Box, ThumbsUp, Phone, Heart } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-purple-400" />,
    title: 'Fast, Free Shipping',
    description: 'On order over $50',
  },
  {
    icon: <Box className="h-8 w-8 text-purple-400" />,
    title: 'Next Day Delivery',
    description: 'Free — spend over $99',
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-purple-400" />,
    title: '60-Day Free Returns',
    description: 'All shipping methods',
  },
  {
    icon: <Phone className="h-8 w-8 text-purple-400" />,
    title: 'Expert Customer Service',
    description: 'Choose chat or call us',
  },
  {
    icon: <Heart className="h-8 w-8 text-purple-400" />,
    title: 'Exclusive Brands',
    description: 'More exclusive products',
  },
];

const FeaturesBar: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[#1A103D] rounded-full text-white p-6 md:p-8 shadow-lg">
          {/* We use grid for a responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-left">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4"
              >
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;