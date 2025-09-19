import { useState } from "react";
import { FormData } from "./OnboardingForm";

interface OnboardScreensProps {
  formData: FormData;
  onComplete: (data: Partial<FormData>) => void;
}

export const OnboardScreens = ({ formData, onComplete }: OnboardScreensProps) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [screenData, setScreenData] = useState({
    numberOfFounders: formData.numberOfFounders,
    teamSize: formData.teamSize,
    foundersRelationship: formData.foundersRelationship,
    orgStructure: formData.orgStructure,
  });

  const handleOptionSelect = (field: keyof typeof screenData, value: string) => {
    const newData = { ...screenData, [field]: value };
    setScreenData(newData);
    
    // Auto-advance to next screen
    setTimeout(() => {
      if (currentScreen < 4) {
        setCurrentScreen(currentScreen + 1);
      } else {
        // Complete onboard section
        onComplete(newData);
      }
    }, 500);
  };

  const screens = [
    {
      title: "Number of founders",
      field: "numberOfFounders" as keyof typeof screenData,
      options: [
        { value: "1", label: "1 founder", icon: "👤" },
        { value: "2", label: "2 founders", icon: "👥" },
        { value: "3+", label: "3+ founders", icon: "👨‍👩‍👧" },
      ]
    },
    {
      title: "Team size",
      field: "teamSize" as keyof typeof screenData,
      options: [
        { value: "justme", label: "Just me", icon: "🚀" },
        { value: "2-5", label: "2-5", icon: "👥" },
        { value: "6-15", label: "6-15", icon: "👨‍👩‍👧‍👦" },
        { value: "15+", label: "15+", icon: "🏢" },
      ]
    },
    {
      title: "Founder's Relationship",
      field: "foundersRelationship" as keyof typeof screenData,
      options: [
        { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
        { value: "friends", label: "Friends", icon: "🤝" },
        { value: "professional", label: "Professional", icon: "💼" },
        { value: "other", label: "Other", icon: "🌟" },
      ]
    },
    {
      title: "Basic org structure & compliance?",
      field: "orgStructure" as keyof typeof screenData,
      options: [
        { value: "yes", label: "Yes", icon: "✅" },
        { value: "no", label: "No", icon: "❌" },
        { value: "not-sure", label: "Not sure", icon: "🤔" },
      ]
    }
  ];

  const currentScreenData = screens[currentScreen - 1];

  return (
    <div className="cosmic-card p-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 mb-6">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index + 1 <= currentScreen 
                  ? 'w-8 bg-cosmic shadow-cosmic' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
        
        <h1 className="text-3xl font-bold mb-2 bg-cosmic bg-clip-text text-transparent">
          {currentScreenData.title}
        </h1>
        <p className="text-muted-foreground">
          Screen {currentScreen} of {screens.length}
        </p>
      </div>

      <div className="space-y-4">
        {currentScreenData.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(currentScreenData.field, option.value)}
            className={`w-full p-6 rounded-xl border transition-all duration-300 text-left group hover:scale-105 ${
              screenData[currentScreenData.field] === option.value
                ? 'border-primary bg-primary/10 shadow-cosmic'
                : 'border-border/30 hover:border-primary/50 hover:bg-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{option.icon}</span>
              <span className="text-lg font-medium group-hover:text-primary transition-colors">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Click any option to continue to the next step
        </p>
      </div>
    </div>
  );
};