
import React, { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: ReactNode;
  show: boolean;
  appear?: boolean;
  unmountOnExit?: boolean;
  className?: string;
  duration?: number;
  animateIn?: string;
  animateOut?: string;
  onExited?: () => void;
}

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  show,
  appear = false,
  unmountOnExit = false,
  className = '',
  duration = 300,
  animateIn = 'animate-fade-in',
  animateOut = 'animate-fade-out',
  onExited,
}) => {
  const [shouldRender, setShouldRender] = useState(show || !unmountOnExit);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState(show && appear ? animateIn : '');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (show) {
      setShouldRender(true);
      setIsAnimating(true);
      
      // Next frame to ensure DOM update before animation
      requestAnimationFrame(() => {
        setAnimationClass(animateIn);
      });
      
      timeout = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    } else {
      setIsAnimating(true);
      setAnimationClass(animateOut);
      
      timeout = setTimeout(() => {
        setIsAnimating(false);
        if (unmountOnExit) {
          setShouldRender(false);
        }
        onExited?.();
      }, duration);
    }
    
    return () => clearTimeout(timeout);
  }, [show, animateIn, animateOut, duration, unmountOnExit, onExited]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        className,
        animationClass,
        isAnimating ? 'duration-300 ease-out' : ''
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
