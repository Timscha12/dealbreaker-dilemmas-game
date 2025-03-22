
import React from 'react';
import { Scenario } from '@/utils/scenarios';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

interface ScenarioCardProps {
  scenario: Scenario;
  isActive?: boolean;
  isPrevious?: boolean;
  isNew?: boolean;
  className?: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  isActive = false,
  isPrevious = false,
  isNew = false,
  className,
}) => {
  return (
    <AnimatedTransition
      show={true}
      appear={isNew}
      animateIn={isNew ? 'animate-card-slide-up' : 'animate-fade-in'}
      className={cn(
        "dealbreaker-card w-full rounded-xl p-6 mb-3 transform transition-all duration-300",
        "border border-gray-100 shadow-sm",
        isActive ? "bg-white deep-shadow scale-100 z-10" : 
          isPrevious ? "bg-gray-50 scale-[0.98] -translate-y-1 z-0" : 
            "bg-gray-50 scale-[0.96] -translate-y-2 z-0",
        isActive ? "ring-1 ring-primary/20" : "",
        className
      )}
    >
      <div className="dealbreaker-card-content">
        <p className={cn(
          "text-balance text-center text-lg font-medium",
          isActive ? "text-gray-900" : "text-gray-700"
        )}>
          {scenario.text}
        </p>
      </div>
    </AnimatedTransition>
  );
};

export default ScenarioCard;
