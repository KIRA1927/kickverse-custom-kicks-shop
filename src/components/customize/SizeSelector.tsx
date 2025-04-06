
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect 
}) => {
  return (
    <RadioGroup 
      value={selectedSize || ""} 
      onValueChange={onSizeSelect}
      className="grid grid-cols-3 gap-2"
    >
      {sizes.map((size) => (
        <div key={size}>
          <RadioGroupItem
            value={size}
            id={`size-${size}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`size-${size}`}
            className="flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 peer-data-[state=checked]:text-purple-600 cursor-pointer"
          >
            {size}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default SizeSelector;
