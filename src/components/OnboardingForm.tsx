import { useState } from "react";
import { OnboardScreens } from "./OnboardScreens";
import { GoalsScreen } from "./GoalsScreen";
import { ChallengesScreen } from "./ChallengesScreen";
import { DashboardScreen } from "./DashboardScreen";
import { ProgressBar } from "./ProgressBar";

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

type Section = 'onboard' | 'goals' | 'challenges' | 'dashboard';

const OnboardingForm = () => {
  const [currentSection, setCurrentSection] = useState<Section>('onboard');
  const [onboardingStep, setOnboardingStep] = useState(1); // Track individual onboarding steps
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

  const sections = ['Onboarding', 'Goals', 'Challenges', 'Dashboard'];
  
  const getSectionNumber = (section: Section): number => {
    const sectionMap = { onboard: 1, goals: 2, challenges: 3, dashboard: 4 };
    return sectionMap[section];
  };

  const handleOnboardComplete = (onboardData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...onboardData }));
    setCurrentSection('goals');
  };

  const handleOnboardingStepChange = (step: number) => {
    setOnboardingStep(step);
  };

  const handleGoalsComplete = (goalsData: Partial<FormData>) => {
    const updatedData = { ...formData, ...goalsData };
    setFormData(updatedData);
    setCurrentSection('challenges');
  };

  const handleChallengesComplete = () => {
    setCurrentSection('dashboard');
  };

  const handleBackNavigation = () => {
    if (currentSection === 'goals') {
      setCurrentSection('onboard');
    } else if (currentSection === 'challenges') {
      setCurrentSection('goals');
    } else if (currentSection === 'dashboard') {
      setCurrentSection('challenges');
    }
  };

  const handleBackToOnboard = () => {
    setCurrentSection('onboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <ProgressBar 
          currentSection={getSectionNumber(currentSection)}
          sections={sections}
          onboardingProgress={currentSection === 'onboard' ? onboardingStep : undefined}
        />
        
        {currentSection === 'onboard' && (
          <OnboardScreens
            formData={formData}
            onComplete={handleOnboardComplete}
            onStepChange={handleOnboardingStepChange}
          />
        )}
        
        {currentSection === 'goals' && (
          <GoalsScreen
            formData={formData}
            onComplete={handleGoalsComplete}
            onBack={handleBackNavigation}
          />
        )}

        {currentSection === 'challenges' && (
          <ChallengesScreen
            onComplete={handleChallengesComplete}
            onBack={handleBackNavigation}
          />
        )}

        {currentSection === 'dashboard' && (
          <DashboardScreen
            formData={formData}
            onBack={handleBackNavigation}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;