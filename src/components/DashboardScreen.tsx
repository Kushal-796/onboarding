import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormData } from "./OnboardingForm";

interface DashboardScreenProps {
  formData: FormData;
  onBack: () => void;
}

export const DashboardScreen = ({ formData, onBack }: DashboardScreenProps) => {
  const stats = [
    { label: "Onboarding", value: "100%", icon: "✅", color: "text-green-400" },
    { label: "Goals Set", value: "2", icon: "🎯", color: "text-blue-400" },
    { label: "Challenges", value: "0/6", icon: "🏆", color: "text-orange-400" },
    { label: "Progress", value: "25%", icon: "📈", color: "text-purple-400" },
  ];

  const quickActions = [
    { title: "Update Goals", icon: "🎯", description: "Modify your 3 and 6-month targets" },
    { title: "View Challenges", icon: "🏆", description: "Explore startup challenges" },
    { title: "Team Settings", icon: "👥", description: "Manage your team configuration" },
    { title: "Resources", icon: "📚", description: "Access guides and templates" },
  ];

  const insights = [
    {
      title: "Next Milestone",
      content: formData.threeMonthGoal || "Set your 3-month goal",
      icon: "⚡",
      type: "goal"
    },
    {
      title: "Team Configuration",
      content: `${formData.numberOfFounders || "Unknown"} founder(s), ${formData.teamSize || "unknown"} team size`,
      icon: "👥",
      type: "team"
    },
    {
      title: "Confidence Level",
      content: `${formData.confidence}% confident in goals`,
      icon: "🎯",
      type: "confidence"
    },
    {
      title: "Potential Blockers",
      content: formData.blockingFactors.length > 0 
        ? `${formData.blockingFactors.length} factors identified`
        : "No blockers identified",
      icon: "🚧",
      type: "blockers"
    }
  ];

  return (
    <div className="cosmic-card p-8 animate-fade-in max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-cosmic bg-clip-text text-transparent">
          Startup Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your mission control center for startup success
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="cosmic-card p-6 text-center group hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Insights */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>🧠</span>
          Your Startup Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <Card key={index} className="cosmic-card p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{insight.title}</h3>
                  <p className="text-muted-foreground text-sm">{insight.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="cosmic-card p-4 hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{action.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{action.description}</p>
                </div>
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  →
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center">
        <Card className="cosmic-card p-6 bg-primary/5 border-primary/20 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">🎉 Welcome to Your Startup Journey!</h3>
          <p className="text-muted-foreground">
            You've completed the onboarding process. Your data has been saved and you're ready to start building your startup empire!
          </p>
        </Card>

        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-3 text-base border-border/50 hover:border-primary/50"
        >
          ← Go Back
        </Button>
      </div>
    </div>
  );
};