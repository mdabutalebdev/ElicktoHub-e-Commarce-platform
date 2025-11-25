import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, size = 16 }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
};