
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/Button';
import ScenarioCard from '@/components/ScenarioCard';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import AdBanner from '@/components/AdBanner';
import { 
  initializeGame, 
  handleDecision, 
  startNewRound,
  getCurrentScenario,
  getRoundDuration,
  GameState
} from '@/utils/gameLogic';
import { cn } from '@/lib/utils';
import { getCustomGameOverMessage, getCustomGameOverEmoji } from '@/utils/messageUtils';
import { prepareInterstitialAd, showInterstitialAd } from '@/utils/adService';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from '@/components/ui/carousel';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showBrokenHeart, setShowBrokenHeart] = useState(false);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState('');
  const [showAd, setShowAd] = useState(false);
  const [dealbreakerCounter, setDealbreakerCounter] = useState(0);
  
  const acceptedScenariosRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Initialize ad service on component mount
    prepareInterstitialAd();
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);
  
  useEffect(() => {
    if (acceptedScenariosRef.current && gameState.acceptedScenarios.length > 0) {
      acceptedScenariosRef.current.scrollTop = acceptedScenariosRef.current.scrollHeight;
    }
  }, [gameState.acceptedScenarios.length]);
  
  useEffect(() => {
    if (gameState.isGameOver) {
      // Don't show toast notifications anymore as the messages are displayed in the text field
      
      if (gameState.currentRound % 3 === 0 && gameState.currentScenarioIndex < gameState.scenarios.length) {
        setShowAd(true);
        
        setTimeout(() => {
          setShowAd(false);
        }, 5000);
      }
      
      setTimeout(() => {
        setShowNewRoundButton(true);
      }, 1500);
    }
  }, [gameState.isGameOver, gameState.currentScenarioIndex, gameState.scenarios.length, gameState.acceptedScenarios.length, gameState.currentRound]);
  
  const getGameOverMessage = (acceptedCount: number) => {
    return getCustomGameOverMessage(acceptedCount);
  };
  
  const getGameCompletedMessage = (acceptedCount: number, totalCount: number) => {
    return getCustomGameOverMessage(acceptedCount);
  };
  
  const handleOkay = () => {
    if (isTransitioning || gameState.isGameOver) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setGameState(prevState => handleDecision(prevState, 'okay'));
      setIsTransitioning(false);
    }, 300);
  };
  
  const handleDealbreaker = () => {
    if (isTransitioning || gameState.isGameOver) return;
    
    // Increment dealbreaker counter and show ad if needed
    const newCounter = dealbreakerCounter + 1;
    setDealbreakerCounter(newCounter);
    
    if (newCounter % 3 === 0) {
      // Every 3rd dealbreaker, show interstitial ad
      showInterstitialAd();
    }
    
    setShowBrokenHeart(true);
    setHeartAnimation('animate-heart-break');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setGameState(prevState => handleDecision(prevState, 'dealbreaker'));
      setIsTransitioning(false);
      
      setTimeout(() => {
        setShowBrokenHeart(false);
      }, 1000);
    }, 1500);
  };
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      handleOkay();
    } else {
      handleDealbreaker();
    }
  };
  
  const handleNewRound = () => {
    setShowBrokenHeart(false);
    setShowNewRoundButton(false);
    setShowAd(false);
    
    // Prepare a new interstitial ad for the next round
    prepareInterstitialAd();
    
    setGameState(prevState => startNewRound(prevState));
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const currentScenario = getCurrentScenario(gameState);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header 
        showBackButton 
        showSettingsButton 
        soundEnabled={soundEnabled} 
        onSoundToggle={toggleSound} 
      />
      
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-4 overflow-hidden">
        <div className="w-full mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span className="font-medium">Runde {gameState.currentRound}</span>
            <span>{gameState.currentScenarioIndex} / {gameState.scenarios.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-okay to-okay-light rounded-full transition-all duration-500"
              style={{ 
                width: `${gameState.scenarios.length > 0 
                  ? (gameState.currentScenarioIndex / gameState.scenarios.length) * 100 
                  : 0}%` 
              }}
            />
          </div>
        </div>
        
        {showBrokenHeart && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md">
            <div className="relative" style={{ width: "160px", height: "160px" }}>
              <div 
                className="absolute w-full h-full"
                style={{ 
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", 
                  animation: "heart-break-left 1.5s forwards cubic-bezier(0.22, 1, 0.36, 1)",
                  backgroundColor: "#e11d48",
                  maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-heart'%3E%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E%3C/svg%3E\")",
                  maskSize: "cover",
                  maskRepeat: "no-repeat",
                  maskPosition: "left"
                }}
              />
              <div 
                className="absolute w-full h-full"
                style={{ 
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)", 
                  animation: "heart-break-right 1.5s forwards cubic-bezier(0.22, 1, 0.36, 1)",
                  backgroundColor: "#e11d48",
                  maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-heart'%3E%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E%3C/svg%3E\")",
                  maskSize: "cover",
                  maskRepeat: "no-repeat",
                  maskPosition: "right"
                }}
              />
            </div>
          </div>
        )}
        
        {showAd && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md">
            <div className="relative p-6 w-11/12 max-w-md">
              <AdBanner forceShow={true} />
              <button 
                onClick={() => setShowAd(false)} 
                className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
              <p className="text-center text-white mt-4 text-sm">Ad schließt in wenigen Sekunden automatisch...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={acceptedScenariosRef}
          className="mb-4 max-h-[35vh] overflow-y-auto scrollbar-hide"
        >
          {gameState.acceptedScenarios.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isPrevious={index === gameState.acceptedScenarios.length - 1}
            />
          ))}
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-6 min-h-[120px]">
          {currentScenario ? (
            <Carousel
              className={cn(
                "w-full max-w-xs h-auto mx-auto",
                gameState.isGameOver ? "pointer-events-none" : ""
              )}
              onDragEnd={(direction) => {
                if (!gameState.isGameOver && !isTransitioning) {
                  handleSwipe(direction === 'left' ? 'left' : 'right');
                }
              }}
            >
              <CarouselContent>
                <CarouselItem>
                  <ScenarioCard
                    scenario={currentScenario}
                    isActive
                    isNew={gameState.acceptedScenarios.length > 0}
                    className={cn(
                      "transform transition-all duration-300",
                      gameState.isGameOver ? "opacity-50" : "",
                      !gameState.isGameOver && "hover:scale-[1.02] shadow-lg"
                    )}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          ) : (
            <AnimatedTransition show={gameState.isGameOver && gameState.currentScenarioIndex >= gameState.scenarios.length}>
              <div className="text-center p-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-md">
                <div className="mb-3">
                  <div className="text-2xl mx-auto">{getCustomGameOverEmoji(gameState.acceptedScenarios.length)}</div>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {getGameCompletedMessage(gameState.acceptedScenarios.length, gameState.scenarios.length)}
                </h2>
                <p className="text-gray-400">
                  
                </p>
              </div>
            </AnimatedTransition>
          )}
        </div>
        
        <div className="flex flex-col gap-3 mb-6">
          <AnimatedTransition
            show={!gameState.isGameOver}
            animateOut="animate-fade-out"
            className="w-full flex flex-col gap-3"
          >
            <Button
              variant="okay"
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all text-sm md:text-base flex items-center justify-center"
              onClick={handleOkay}
              disabled={isTransitioning || !currentScenario}
            >
              <Check size={18} className="mr-2" />
              <span>Okay</span>
            </Button>
            
            <Button
              variant="dealbreaker"
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all text-sm md:text-base flex items-center justify-center"
              onClick={handleDealbreaker}
              disabled={isTransitioning || !currentScenario}
            >
              <X size={18} className="mr-2" />
              <span>Dealbreaker</span>
            </Button>
          </AnimatedTransition>
          
          <AnimatedTransition
            show={showNewRoundButton}
            animateIn="animate-scale-in"
            className="w-full"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all text-sm md:text-base flex items-center justify-center"
              onClick={handleNewRound}
            >
              <RefreshCw size={18} className="mr-2" />
              <span>Neue Runde</span>
            </Button>
          </AnimatedTransition>
        </div>
        
        <AnimatedTransition
          show={gameState.isGameOver}
          animateIn="animate-fade-in"
          className="text-center"
        >
          <p className="text-gray-400 glass-effect py-2 px-4 rounded-full inline-block text-sm">
            {gameState.acceptedScenarios.length > 0 
              ? `Du hast ${gameState.acceptedScenarios.length} Eigenschaften akzeptiert.`
              : "Das war sofort ein Dealbreaker für dich!"}
          </p>
        </AnimatedTransition>
        
        <AdBanner position="bottom" />
      </main>
    </div>
  );
};

export default Game;
