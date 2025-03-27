

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Check, X } from 'lucide-react';
import Button from '@/components/Button';
import AnimatedTransition from '@/components/AnimatedTransition';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { playSound } from '@/utils/soundUtils';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  const handleStartGame = () => {
    setIsLoading(true);
    playSound('buttonClick');
    // Simulate loading for a better UX
    setTimeout(() => {
      navigate('/game');
    }, 600);
  };
  
  return (
    <div className="min-h-[100dvh] h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden">
      <Header showSettingsButton />
      
      <main className={cn(
        "flex-1 flex flex-col items-center justify-between p-6",
        "max-w-md mx-auto",
        // Safe area bottom padding for iPhones with home button
        "pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
      )}>
        <div /> {/* Spacer */}
        
        <div className="flex flex-col items-center">
          <AnimatedTransition 
            show={true} 
            appear 
            animateIn="animate-scale-in"
            className="mb-8"
          >
            <div className="relative">
              <Heart 
                size={84} 
                className="text-dealbreaker-light animate-heartbeat" 
                fill="currentColor" 
              />
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition 
            show={true} 
            appear 
            animateIn="animate-fade-in"
            className="text-center mb-10 delay-100"
          >
            <h1 className="text-4xl font-bold mb-4">Dealbreaker</h1>
            <p className="text-lg text-white mb-8 text-balance">
              Wie viele Eigenheiten kannst du akzeptieren, bevor du "Nein danke" sagst?
            </p>
          </AnimatedTransition>
        </div>
        
        <AnimatedTransition 
          show={true} 
          appear 
          animateIn="animate-fade-in"
          className="w-full space-y-6 delay-200"
        >
          <Button 
            onClick={handleStartGame} 
            size="lg" 
            className="w-full text-lg font-medium"
            isLoading={isLoading}
          >
            Spiel starten
          </Button>
          
          <div className="flex justify-center gap-8 p-4">
            <div className="text-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto",
                "bg-dealbreaker text-white"
              )}>
                <X size={24} />
              </div>
              <p className="text-sm text-gray-600">Dealbreaker</p>
            </div>
            
            <div className="text-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto",
                "bg-okay text-white"
              )}>
                <Check size={24} />
              </div>
              <p className="text-sm text-gray-600">Okay</p>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Ein Partyspiel für Menschen mit niedrigen Ansprüchen
            </p>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Index;