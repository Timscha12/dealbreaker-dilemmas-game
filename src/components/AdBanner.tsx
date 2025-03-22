
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
  position?: 'bottom';
  forceShow?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  className, 
  position = 'bottom',
  forceShow = false
}) => {
  const [isProduction, setIsProduction] = useState(false);
  
  useEffect(() => {
    // Check if we're running in production or development
    const hostname = window.location.hostname;
    setIsProduction(hostname !== 'localhost' && !hostname.includes('lovable'));
  }, []);

  // Display banner ad initialization message in console
  useEffect(() => {
    if (isProduction) {
      console.log('Banner ad would be displayed in production with ID: ca-app-pub-9403941304964602/8097335064');
    } else {
      console.log('Banner ad would be displayed with test ID in development');
    }
  }, [isProduction]);

  return (
    <div 
      className={cn(
        "w-full p-3 rounded-lg overflow-hidden text-center relative bg-opacity-90 backdrop-blur-sm border",
        "animate-pulse-slow",
        position === 'bottom' && "mt-4 sticky bottom-4 z-10",
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
