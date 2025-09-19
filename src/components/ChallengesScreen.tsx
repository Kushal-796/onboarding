import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ChallengesScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ChallengesScreen = ({ onComplete, onBack }: ChallengesScreenProps) => {
  const challenges = [
    {
      title: "Market Analysis",
      description: "Understanding your target market and competition",
      icon: "📊",
      difficulty: "Medium",
      status: "upcoming"
    },
    {
      title: "Product Development",
      description: "Building your MVP and core features",
      icon: "🛠️",
      difficulty: "Hard",
      status: "upcoming"
    },
    {
      title: "Customer Acquisition",
      description: "Finding and converting your first customers",
      icon: "🎯",
      difficulty: "Hard",
      status: "upcoming"
    },
    {
      title: "Funding Strategy",
      description: "Securing investment for growth",
      icon: "💰",
      difficulty: "Expert",
      status: "upcoming"
    },
    {
      title: "Team Building",
      description: "Hiring and managing your core team",
      icon: "👥",
      difficulty: "Medium",
      status: "upcoming"
    },
    {
      title: "Legal & Compliance",
      description: "Setting up proper business structure",
      icon: "⚖️",
      difficulty: "Medium",
      status: "upcoming"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Hard": return "text-orange-400";
      case "Expert": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="cosmic-card p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-cosmic bg-clip-text text-transparent">
          Startup Challenges
        </h1>
        <p className="text-muted-foreground">
          Navigate through key challenges every startup faces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {challenges.map((challenge, index) => (
          <Card key={index} className="cosmic-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{challenge.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mb-8">
        <div className="cosmic-card p-6 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-semibold mb-2 text-primary">🚀 Challenge System</h3>
          <p className="text-muted-foreground">
            Complete challenges to unlock resources, templates, and expert guidance tailored to your startup journey.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-3 text-base border-border/50 hover:border-primary/50"
        >
          ← Back
        </Button>
        
        <Button
          onClick={onComplete}
          className="px-8 py-3 text-base cosmic-button animate-glow-pulse"
        >
          Continue to Dashboard →
        </Button>
      </div>
    </div>
  );
};