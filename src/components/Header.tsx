
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
  soundEnabled?: boolean;
  onSoundToggle?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showSettingsButton = false,
  soundEnabled = true,
  onSoundToggle,
  className,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === '/settings';
  
  return (
    <header className={cn(
      "w-full py-4 px-6 flex items-center justify-between",
      "glass-effect card-shadow z-10",
      className
    )}>
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            aria-label="Zurück"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>
      
      {title && (
        <h1 className="text-xl font-medium absolute left-1/2 transform -translate-x-1/2">
          {title}
        </h1>
      )}
      
      <div className="flex items-center gap-2">
        {onSoundToggle && (
          <button
            onClick={onSoundToggle}
            aria-label={soundEnabled ? "Ton aus" : "Ton an"}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-all duration-300"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        )}
        
        {showSettingsButton && !isSettingsPage && (
          <button
            onClick={() => navigate('/settings')}
            aria-label="Einstellungen"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-all duration-300"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
