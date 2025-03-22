
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartCrack, Check, X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/Button';
import ScenarioCard from '@/components/ScenarioCard';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import { 
  initializeGame, 
  handleDecision, 
  startNewRound,
  getCurrentScenario,
  GameState
} from '@/utils/gameLogic';
import { cn } from '@/lib/utils';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animateHeartBreak, setAnimateHeartBreak] = useState(false);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHeartCrack, setShowHeartCrack] = useState(false);
  
  const acceptedScenariosRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (acceptedScenariosRef.current && gameState.acceptedScenarios.length > 0) {
      acceptedScenariosRef.current.scrollTop = acceptedScenariosRef.current.scrollHeight;
    }
  }, [gameState.acceptedScenarios.length]);
  
  useEffect(() => {
    if (gameState.isGameOver) {
      if (gameState.currentScenarioIndex < gameState.scenarios.length) {
        toast.error(
          gameState.acceptedScenarios.length > 0 
            ? `Nach ${gameState.acceptedScenarios.length} akzeptierten Eigenschaften ist Schluss!` 
            : "Das war direkt ein Dealbreaker!"
        );
      } else {
        toast.success("Wow! Du hast alle Eigenschaften akzeptiert!");
      }
      
      setTimeout(() => {
        setShowNewRoundButton(true);
      }, 1500);
    }
  }, [gameState.isGameOver, gameState.currentScenarioIndex, gameState.scenarios.length, gameState.acceptedScenarios.length]);
  
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
    
    setAnimateHeartBreak(true);
    setShowHeartCrack(false); // Start with normal heart
    setIsTransitioning(true);
    
    // Show normal heart first with a pulse animation
    setTimeout(() => {
      // Then switch to broken heart with the breaking animation
      setShowHeartCrack(true);
      
      // Update game state after animation starts
      setTimeout(() => {
        setGameState(prevState => handleDecision(prevState, 'dealbreaker'));
        setIsTransitioning(false);
        
        // Reset animation after it completes
        setTimeout(() => {
          setAnimateHeartBreak(false);
        }, 1200); // Give more time for the animation to complete
      }, 400); // Slightly longer delay before state update
    }, 300); // Slightly longer initial delay
  };
  
  const handleNewRound = () => {
    setAnimateHeartBreak(false);
    setShowNewRoundButton(false);
    setGameState(prevState => startNewRound(prevState));
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const currentScenario = getCurrentScenario(gameState);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header 
        showBackButton 
        showSettingsButton 
        soundEnabled={soundEnabled} 
        onSoundToggle={toggleSound} 
      />
      
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 py-4 overflow-hidden">
        <div className="w-full mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="font-medium">Runde {gameState.currentRound}</span>
            <span>{gameState.currentScenarioIndex} / {gameState.scenarios.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
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
        
        {animateHeartBreak && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
            {showHeartCrack ? (
              <HeartCrack 
                size={120} 
                className="text-dealbreaker animate-heart-break" 
                fill="currentColor"
              />
            ) : (
              <Heart 
                size={120} 
                className="text-dealbreaker animate-pulse" 
                fill="currentColor" 
              />
            )}
          </div>
        )}
        
        <div 
          ref={acceptedScenariosRef}
          className="mb-4 max-h-[40vh] overflow-y-auto scrollbar-hide"
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
          ) : (
            <AnimatedTransition show={gameState.isGameOver && gameState.currentScenarioIndex >= gameState.scenarios.length}>
              <div className="text-center p-6 bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 shadow-md">
                <div className="mb-3">
                  <Heart size={40} className="text-okay mx-auto" fill="currentColor" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Alle Szenarien akzeptiert!</h2>
                <p className="text-gray-600">Du bist wirklich unglaublich anspruchslos!</p>
              </div>
            </AnimatedTransition>
          )}
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <AnimatedTransition
            show={!gameState.isGameOver}
            animateOut="animate-fade-out"
            className="w-full flex gap-4"
          >
            <Button
              variant="dealbreaker"
              size="lg"
              className="flex-1 shadow-md hover:shadow-lg transition-all"
              onClick={handleDealbreaker}
              disabled={isTransitioning || !currentScenario}
            >
              <X size={20} className="mr-2" />
              Dealbreaker
            </Button>
            
            <Button
              variant="okay"
              size="lg"
              className="flex-1 shadow-md hover:shadow-lg transition-all"
              onClick={handleOkay}
              disabled={isTransitioning || !currentScenario}
            >
              <Check size={20} className="mr-2" />
              Okay
            </Button>
          </AnimatedTransition>
          
          <AnimatedTransition
            show={showNewRoundButton}
            animateIn="animate-scale-in"
            className="w-full"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all"
              onClick={handleNewRound}
            >
              <RefreshCw size={20} className="mr-2" />
              Neue Runde
            </Button>
          </AnimatedTransition>
        </div>
        
        <AnimatedTransition
          show={gameState.isGameOver}
          animateIn="animate-fade-in"
          className="text-center"
        >
          <p className="text-gray-600 glass-effect py-2 px-4 rounded-full inline-block">
            {gameState.acceptedScenarios.length > 0 
              ? `Du hast ${gameState.acceptedScenarios.length} Eigenschaften akzeptiert.`
              : "Das war sofort ein Dealbreaker für dich!"}
          </p>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Game;
