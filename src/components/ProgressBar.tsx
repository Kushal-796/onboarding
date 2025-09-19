interface ProgressBarProps {
  currentSection: number;
  sections: string[];
  onboardingProgress?: number; // For detailed onboarding progress
}

export const ProgressBar = ({ currentSection, sections, onboardingProgress }: ProgressBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {sections.map((section, index) => {
          const isActive = index + 1 === currentSection;
          const isCompleted = index + 1 < currentSection;
          const isOnboarding = index === 0 && section === 'Onboarding';
          
          return (
            <div key={section} className="flex-1 relative">
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 relative z-10
                    ${isCompleted 
                      ? 'bg-cosmic text-primary-foreground shadow-cosmic' 
                      : isActive 
                        ? 'bg-primary/20 border-2 border-primary text-primary animate-glow-pulse' 
                        : 'bg-muted border-2 border-border text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                
                {/* Connection line to next section */}
                {index < sections.length - 1 && (
                  <div 
                    className={`
                      flex-1 h-0.5 mx-2 transition-all duration-500
                      ${isCompleted ? 'bg-cosmic shadow-cosmic' : 'bg-border'}
                    `} 
                  />
                )}
              </div>
              
              {/* Section label */}
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {section}
                </p>
                
                {/* Onboarding sub-progress */}
                {isOnboarding && isActive && onboardingProgress !== undefined && (
                  <div className="mt-1">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-cosmic h-1 rounded-full transition-all duration-300 shadow-cosmic"
                        style={{ width: `${(onboardingProgress / 4) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {onboardingProgress}/4 steps
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};