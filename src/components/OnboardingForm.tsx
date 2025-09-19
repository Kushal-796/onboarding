import { useState } from "react";
import { OnboardScreens } from "./OnboardScreens";
import { GoalsScreen } from "./GoalsScreen";

export interface FormData {
  numberOfFounders: string;
  teamSize: string;
  foundersRelationship: string;
  orgStructure: string;
  threeMonthGoal: string;
  sixMonthGoal: string;
  confidence: number;
  blockingFactors: string[];
  needsGrowthPlan: boolean | null;
}

const OnboardingForm = () => {
  const [currentSection, setCurrentSection] = useState<'onboard' | 'goals'>('onboard');
  const [formData, setFormData] = useState<FormData>({
    numberOfFounders: '',
    teamSize: '',
    foundersRelationship: '',
    orgStructure: '',
    threeMonthGoal: '',
    sixMonthGoal: '',
    confidence: 50,
    blockingFactors: [],
    needsGrowthPlan: null
  });

  const handleOnboardComplete = (onboardData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...onboardData }));
    setCurrentSection('goals');
  };

  const handleGoalsComplete = (goalsData: Partial<FormData>) => {
    const finalData = { ...formData, ...goalsData };
    setFormData(finalData);
    
    // Here you would typically send the data to your backend
    console.log('Form completed with data:', finalData);
    
    // For now, just show a success message
    alert('🚀 Onboarding complete! Data ready for database storage.');
  };

  const goBackToOnboard = () => {
    setCurrentSection('onboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentSection === 'onboard' && (
          <OnboardScreens
            formData={formData}
            onComplete={handleOnboardComplete}
          />
        )}
        
        {currentSection === 'goals' && (
          <GoalsScreen
            formData={formData}
            onComplete={handleGoalsComplete}
            onBack={goBackToOnboard}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;