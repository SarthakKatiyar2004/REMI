import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

type View = "landing" | "editor";

function App() {
  const [view, setView] = useState<View>("landing");

  if (view === "editor") {
    return <Dashboard onBackToHome={() => setView("landing")} />;
  }

  return <LandingPage onStart={() => setView("editor")} />;
}

export default App;
