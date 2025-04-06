
import React from 'react';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorSelectorProps {
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  selectedColor, 
  onColorSelect 
}) => {
  const colors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
    { name: 'Gray', value: 'gray' }
  ];
  
  return (
    <div className="grid grid-cols-5 gap-2">
      {colors.map((color) => (
        <div key={color.value} className="text-center">
          <button
            className={`w-12 h-12 rounded-full ${
              selectedColor === color.value 
                ? 'ring-2 ring-offset-2 ring-purple-600' 
                : 'ring-1 ring-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorSelect(color.value)}
            aria-label={`Select ${color.name} color`}
          />
          <p className="mt-1 text-xs">{color.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
