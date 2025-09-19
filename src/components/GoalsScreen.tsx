import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FormData } from "./OnboardingForm";

interface GoalsScreenProps {
  formData: FormData;
  onComplete: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export const GoalsScreen = ({ formData, onComplete, onBack }: GoalsScreenProps) => {
  const [goalsData, setGoalsData] = useState({
    threeMonthGoal: formData.threeMonthGoal,
    sixMonthGoal: formData.sixMonthGoal,
    confidence: formData.confidence,
    blockingFactors: formData.blockingFactors,
    needsGrowthPlan: formData.needsGrowthPlan,
  });

  const blockingOptions = [
    { id: 'funding', label: 'Funding', icon: '💰' },
    { id: 'hiring', label: 'Hiring', icon: '👥' },
    { id: 'product', label: 'Product', icon: '🛠️' },
    { id: 'compliance', label: 'Compliance', icon: '📋' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
    { id: 'competition', label: 'Competition', icon: '⚔️' },
  ];

  const handleBlockingFactorChange = (factorId: string, checked: boolean) => {
    const updatedFactors = checked
      ? [...goalsData.blockingFactors, factorId]
      : goalsData.blockingFactors.filter(id => id !== factorId);
    
    setGoalsData(prev => ({ ...prev, blockingFactors: updatedFactors }));
  };

  const handleSubmit = () => {
    onComplete(goalsData);
  };

  const isFormValid = goalsData.threeMonthGoal.trim() && goalsData.sixMonthGoal.trim() && goalsData.needsGrowthPlan !== null;

  return (
    <div className="cosmic-card p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-cosmic bg-clip-text text-transparent">
          Set Your Startup Goals
        </h1>
        <p className="text-muted-foreground">
          Define your vision and identify potential challenges
        </p>
      </div>

      <div className="space-y-8">
        {/* 3-month goal */}
        <div className="space-y-3">
          <label className="text-lg font-medium flex items-center gap-2">
            <span className="text-xl">⚡</span>
            What's your 3-month goal?
          </label>
          <Textarea
            value={goalsData.threeMonthGoal}
            onChange={(e) => setGoalsData(prev => ({ ...prev, threeMonthGoal: e.target.value }))}
            placeholder="e.g., Complete MVP and get 10 beta users..."
            className="cosmic-input min-h-[100px] resize-none text-base"
          />
        </div>

        {/* 6-month goal */}
        <div className="space-y-3">
          <label className="text-lg font-medium flex items-center gap-2">
            <span className="text-xl">🏆</span>
            What's your 6-month goal?
          </label>
          <Textarea
            value={goalsData.sixMonthGoal}
            onChange={(e) => setGoalsData(prev => ({ ...prev, sixMonthGoal: e.target.value }))}
            placeholder="e.g., Secure seed funding and hire 2 developers..."
            className="cosmic-input min-h-[100px] resize-none text-base"
          />
        </div>

        {/* Confidence slider */}
        <div className="space-y-4">
          <label className="text-lg font-medium flex items-center gap-2">
            <span className="text-xl">🎯</span>
            How confident are you in achieving these goals?
          </label>
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={[goalsData.confidence]}
                onValueChange={(value) => setGoalsData(prev => ({ ...prev, confidence: value[0] }))}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-4">
              <span>0%</span>
              <span className="text-primary font-bold text-lg">{goalsData.confidence}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Blocking factors */}
        <div className="space-y-4">
          <label className="text-lg font-medium flex items-center gap-2">
            <span className="text-xl">🚧</span>
            What might block your goals?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {blockingOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <Checkbox
                  id={option.id}
                  checked={goalsData.blockingFactors.includes(option.id)}
                  onCheckedChange={(checked) => handleBlockingFactorChange(option.id, !!checked)}
                  className="border-border/50"
                />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                >
                  <span>{option.icon}</span>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Growth plan */}
        <div className="space-y-4">
          <label className="text-lg font-medium flex items-center gap-2">
            <span className="text-xl">📈</span>
            Do you need a growth plan?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setGoalsData(prev => ({ ...prev, needsGrowthPlan: true }))}
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                goalsData.needsGrowthPlan === true
                  ? 'border-primary bg-primary/10 shadow-cosmic'
                  : 'border-border/30 hover:border-primary/50'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">📊</div>
                <div className="font-medium group-hover:text-primary transition-colors">Yes</div>
              </div>
            </button>
            
            <button
              onClick={() => setGoalsData(prev => ({ ...prev, needsGrowthPlan: false }))}
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                goalsData.needsGrowthPlan === false
                  ? 'border-destructive bg-destructive/10 shadow-cosmic-accent'
                  : 'border-border/30 hover:border-destructive/50'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">❌</div>
                <div className="font-medium group-hover:text-destructive transition-colors">No</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between mt-12">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-3 text-base border-border/50 hover:border-primary/50"
        >
          Back
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-8 py-3 text-base cosmic-button ${
            isFormValid ? 'animate-glow-pulse' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Complete Setup 🚀
        </Button>
      </div>
    </div>
  );
};