
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  className,
  showValue = false,
  onChange,
  readOnly = true,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  // Calculate star sizes based on the size prop
  const getStarSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'md':
        return 18;
      case 'lg':
        return 22;
      default:
        return 18;
    }
  };

  // Create an array of star indices
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  // Check if the star should be filled
  const isFilled = (starIndex: number) => {
    if (hoverValue !== null && !readOnly) {
      return starIndex <= hoverValue;
    }
    return starIndex <= value;
  };

  // Handle star click
  const handleClick = (starIndex: number) => {
    if (!readOnly && onChange) {
      onChange(starIndex);
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {stars.map((starIndex) => (
          <span
            key={starIndex}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={readOnly ? undefined : () => setHoverValue(starIndex)}
            onMouseLeave={readOnly ? undefined : () => setHoverValue(null)}
            className={cn(
              'cursor-default transition-colors',
              !readOnly && 'cursor-pointer'
            )}
          >
            <Star
              size={getStarSize()}
              className={cn(
                isFilled(starIndex)
                  ? 'text-amber-400 fill-current'
                  : 'text-gray-300',
                'transition-colors'
              )}
            />
          </span>
        ))}
      </div>

      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default Rating;
