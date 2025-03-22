
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, Check, X, RefreshCw } from 'lucide-react';
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
  GameState
} from '@/utils/gameLogic';
import { cn } from '@/lib/utils';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animateSkull, setAnimateSkull] = useState(false);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [skullAnimation, setSkullAnimation] = useState('');
  
  const acceptedScenariosRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply dark mode to the document
    document.documentElement.classList.add('dark');
    
    // Clean up function to remove dark mode when component unmounts
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
    
    setAnimateSkull(true);
    setSkullAnimation('animate-skull-shake');
    setIsTransitioning(true);
    
    // Show skull with shake animation
    setTimeout(() => {
      // Then switch to disappearing animation
      setSkullAnimation('animate-skull-disappear');
      
      // Update game state after animation starts
      setTimeout(() => {
        setGameState(prevState => handleDecision(prevState, 'dealbreaker'));
        setIsTransitioning(false);
        
        // Reset animation after it completes
        setTimeout(() => {
          setAnimateSkull(false);
        }, 1200);
      }, 600);
    }, 600);
  };
  
  const handleNewRound = () => {
    setAnimateSkull(false);
    setShowNewRoundButton(false);
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
        
        {/* Ad Banner at top */}
        <AdBanner position="top" />
        
        {animateSkull && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center">
            <Skull 
              size={120} 
              className={`text-dealbreaker ${skullAnimation}`}
            />
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
              <div className="text-center p-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-md">
                <div className="mb-3">
                  <Check size={40} className="text-okay mx-auto" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Alle Szenarien akzeptiert!</h2>
                <p className="text-gray-400">Du bist wirklich unglaublich anspruchslos!</p>
              </div>
            </AnimatedTransition>
          )}
        </div>
        
        {/* Ad Banner inline */}
        <AdBanner position="inline" />
        
        <div className="flex flex-col gap-3 mb-6">
          <AnimatedTransition
            show={!gameState.isGameOver}
            animateOut="animate-fade-out"
            className="w-full flex flex-col gap-3"
          >
            <Button
              variant="okay"
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all text-sm md:text-base"
              onClick={handleOkay}
              disabled={isTransitioning || !currentScenario}
            >
              <Check size={18} className="mr-2" />
              Okay
            </Button>
            
            <Button
              variant="dealbreaker"
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all text-sm md:text-base"
              onClick={handleDealbreaker}
              disabled={isTransitioning || !currentScenario}
            >
              <X size={18} className="mr-2" />
              Dealbreaker
            </Button>
          </AnimatedTransition>
          
          <AnimatedTransition
            show={showNewRoundButton}
            animateIn="animate-scale-in"
            className="w-full"
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg transition-all text-sm md:text-base"
              onClick={handleNewRound}
            >
              <RefreshCw size={18} className="mr-2" />
              Neue Runde
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
        
        {/* Ad Banner at bottom */}
        <AdBanner position="bottom" />
      </main>
    </div>
  );
};

export default Game;
