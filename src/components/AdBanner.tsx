
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
  position?: 'top' | 'bottom' | 'inline';
  forceShow?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  className, 
  position = 'inline',
  forceShow = false
}) => {
  return (
    <div 
      className={cn(
        "w-full p-3 rounded-lg overflow-hidden text-center relative bg-opacity-90 backdrop-blur-sm border",
        "animate-pulse-slow",
        position === 'top' && "mb-4 sticky top-0 z-10",
        position === 'bottom' && "mt-4 sticky bottom-4 z-10",
        position === 'inline' && "my-4",
        "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200",
        "bg-gray-100 border-gray-200 text-gray-700",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium">
          Sponsored
        </span>
        <span className="text-xs bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
          Ad
        </span>
      </div>
      <div className="mt-2 flex items-center justify-center">
        <span className="text-xs opacity-70">
          Premium Dealbreaker version - No ads!
        </span>
        <ExternalLink size={12} className="ml-1 opacity-70" />
      </div>
    </div>
  );
};

export default AdBanner;
