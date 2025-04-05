
import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepsContextValue {
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

const StepsContext = createContext<StepsContextValue | null>(null);

export function Steps({
  currentStep,
  orientation = 'vertical',
  children,
  className,
}: {
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <StepsContext.Provider value={{ currentStep, orientation }}>
      <div
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4',
          className
        )}
      >
        {childrenArray.map((child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                step: index,
                isLastStep: index === childrenArray.length - 1,
              })
            : child
        )}
      </div>
    </StepsContext.Provider>
  );
}

export function Step({
  title,
  description,
  icon,
  step,
  isLastStep = false,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  step?: number;
  isLastStep?: boolean;
}) {
  const context = useContext(StepsContext);

  if (!context) {
    throw new Error('Step must be used within a Steps component');
  }

  const { currentStep, orientation } = context;
  const isCompleted = step !== undefined && currentStep > step;
  const isActive = step !== undefined && currentStep === step;

  return (
    <div 
      className={cn(
        'flex',
        orientation === 'vertical' ? 'items-start' : 'flex-1 flex-col items-center'
      )}
    >
      <div className={cn('flex', orientation === 'vertical' ? 'flex-row' : 'flex-col items-center')}>
        {/* Step Icon/Number */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full w-8 h-8 border-2 transition-colors',
            isCompleted ? 'bg-green-600 border-green-600 text-white' : 
              isActive ? 'border-purple-600 text-purple-600' : 'border-gray-300 text-gray-400'
          )}
        >
          {isCompleted ? (
            <Check className="h-4 w-4" />
          ) : icon ? (
            icon
          ) : (
            <span className="text-sm">{(step || 0) + 1}</span>
          )}
        </div>
        
        {/* Step Content */}
        <div 
          className={cn(
            'flex flex-col',
            orientation === 'vertical' ? 'ml-3' : 'mt-2 text-center',
          )}
        >
          {title && (
            <span 
              className={cn(
                'text-sm font-medium',
                isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
              )}
            >
              {title}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      </div>

      {/* Connector */}
      {!isLastStep && (
        <div
          className={cn(
            orientation === 'vertical' 
              ? 'ml-4 h-6 border-l-2 my-1'
              : 'w-full h-0 border-t-2 mt-4 mb-2',
            isCompleted ? 'border-green-600' : 'border-gray-200'
          )}
        />
      )}
    </div>
  );
}
