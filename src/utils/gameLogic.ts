
import { Scenario, getRandomScenarios } from './scenarios';

export interface GameState {
  currentRound: number;
  scenarios: Scenario[];
  acceptedScenarios: Scenario[];
  currentScenarioIndex: number;
  isGameOver: boolean;
  roundStartTime: number;
}

export const initialGameState: GameState = {
  currentRound: 1,
  scenarios: [],
  acceptedScenarios: [],
  currentScenarioIndex: 0,
  isGameOver: false,
  roundStartTime: 0,
};

export function initializeGame(scenarioCount: number = 10): GameState {
  return {
    ...initialGameState,
    scenarios: getRandomScenarios(scenarioCount),
    roundStartTime: Date.now(),
  };
}

export function handleDecision(
  gameState: GameState,
  decision: 'okay' | 'dealbreaker'
): GameState {
  if (gameState.isGameOver) {
    return gameState;
  }

  if (decision === 'okay') {
    // Accept the current scenario
    const acceptedScenario = gameState.scenarios[gameState.currentScenarioIndex];
    
    // Move to the next scenario
    const nextIndex = gameState.currentScenarioIndex + 1;
    const isGameOver = nextIndex >= gameState.scenarios.length;
    
    return {
      ...gameState,
      acceptedScenarios: [...gameState.acceptedScenarios, acceptedScenario],
      currentScenarioIndex: nextIndex,
      isGameOver,
    };
  } else {
    // Dealbreaker - end the game
    return {
      ...gameState,
      isGameOver: true,
    };
  }
}

export function startNewRound(gameState: GameState, scenarioCount: number = 10): GameState {
  return {
    ...initialGameState,
    currentRound: gameState.currentRound + 1,
    scenarios: getRandomScenarios(scenarioCount),
    roundStartTime: Date.now(),
  };
}

export function getCurrentScenario(gameState: GameState): Scenario | null {
  if (gameState.isGameOver || gameState.currentScenarioIndex >= gameState.scenarios.length) {
    return null;
  }
  return gameState.scenarios[gameState.currentScenarioIndex];
}

export function getRoundDuration(gameState: GameState): number {
  return Math.floor((Date.now() - gameState.roundStartTime) / 1000);
}
