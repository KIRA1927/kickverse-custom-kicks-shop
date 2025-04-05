
import React from 'react';
import { cn } from '@/lib/utils';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorGridProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorGrid = ({ colors, selectedColor, onSelectColor }: ColorGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
      {colors.map((color) => (
        <button
          key={color.value}
          className={cn(
            "h-8 w-8 rounded-full border border-gray-200",
            selectedColor === color.value && "ring-2 ring-offset-2 ring-purple-600"
          )}
          style={{ backgroundColor: color.value }}
          onClick={() => onSelectColor(color.value)}
          title={color.name}
          aria-label={`Select color ${color.name}`}
        />
      ))}
    </div>
  );
};

export default ColorGrid;
