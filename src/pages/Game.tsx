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

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showBrokenHeart, setShowBrokenHeart] = useState(false);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState('');
  const [showAd, setShowAd] = useState(false);
  
  const acceptedScenariosRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
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
  
  const handleNewRound = () => {
    setShowBrokenHeart(false);
    setShowNewRoundButton(false);
    setShowAd(false);
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
          <div className="broken-heart-container">
            <div className="broken-heart">
              <div 
                className="heart-half heart-left animate-heart-break-left" 
                style={{ backgroundImage: "url('/lovable-uploads/f4383ebf-6a2e-400e-893d-7cd699d16f1e.png')" }}
              ></div>
              <div 
                className="heart-half heart-right animate-heart-break-right" 
                style={{ backgroundImage: "url('/lovable-uploads/f4383ebf-6a2e-400e-893d-7cd699d16f1e.png')" }}
              ></div>
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
        
        <AdBanner position="bottom" />
      </main>
    </div>
  );
};

export default Game;
