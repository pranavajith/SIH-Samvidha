const narrationTexts = {
  Home: "Welcome to Samvidhan. Play and Learn Now!",
  SignUp: "Get Started! Create account to play games!",
  SignIn: "Welcome back! SignIn to Play!",
  About: "Learn more about us on this page.",
  Timeline: "A brief summary of the Constitution of India.",
  Dashboard: "Welcome to your dashboard. Here you can view your profile, leaderboard, and ask AI questions.",
  Leaderboard: "Navigating to the leaderboard.",
  LeaderMain: "Compete against other players for glory!",
  AskAIMain: "Chat with AI on the Indian Constitution",
  Demo: "Navigating to Demo",
  DemoMain: "Play a Quick Demo in 4 Levels",
  AskAI: "Navigating to the Ask AI section.",
  SignOut: "Signing out. Goodbye!",
  Profile: "Navigating to your profile.",
  // Add more components and their narration text
};

export const getNarrationText = (componentName) => {
  return narrationTexts[componentName] || "No narration available.";
};
