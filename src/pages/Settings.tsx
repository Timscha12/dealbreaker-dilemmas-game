
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Info } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title="Einstellungen"
        showBackButton 
      />
      
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Audio</h2>
            
            <div 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={toggleSound}
            >
              <div className="flex items-center">
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                <span className="ml-3">Soundeffekte</span>
              </div>
              
              <div className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors",
                soundEnabled ? "bg-okay" : "bg-gray-300"
              )}>
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full shadow transform transition-transform",
                  soundEnabled ? "translate-x-6" : "translate-x-0"
                )} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Über die App</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Info size={20} className="mt-1 mr-3 text-gray-500" />
                <div>
                  <h3 className="font-medium">Wie funktioniert das Spiel?</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Bei jedem Schritt wird eine neue Eigenschaft einer fiktiven Person enthüllt. 
                    Du entscheidest: "Okay" – du nimmst die neue Info in Kauf oder "Dealbreaker" – das ist zu viel.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info size={20} className="mt-1 mr-3 text-gray-500" />
                <div>
                  <h3 className="font-medium">Partyspiel</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Am besten spielt man Dealbreaker in geselliger Runde, um die eigenen Ansprüche zu vergleichen 
                    und darüber zu lachen, was für andere ein absolutes No-Go wäre.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Version</h2>
            <p className="text-gray-600">Dealbreaker v1.0.0</p>
          </div>
          
          <Button
            variant="ghost"
            className="w-full border border-gray-200"
            onClick={() => navigate('/')}
          >
            Zurück zum Spiel
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
