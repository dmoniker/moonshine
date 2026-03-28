import { QuestProvider, useQuest } from "./context/QuestContext";
import { CelebrateModal } from "./components/CelebrateModal";
import { Dashboard } from "./components/Dashboard";
import { Journal } from "./components/Journal";
import { MyModel } from "./components/MyModel";
import { Plan } from "./components/Plan";
import { QuestSyncModal } from "./components/QuestSyncModal";
import { Resources } from "./components/Resources";
import { Sidebar } from "./components/Sidebar";
import { WelcomeScreen } from "./components/WelcomeScreen";

function Shell() {
  const { ready, activeTab, profileData } = useQuest();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-pulse" aria-hidden>
            🌙
          </div>
          <p className="text-slate-400 text-sm">Loading your quest data…</p>
        </div>
      </div>
    );
  }

  const showWelcome = !profileData.welcomeSeen;

  return (
    <>
      {showWelcome && <WelcomeScreen />}
      <div className="min-h-screen flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8 md:pl-10 max-w-6xl mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 py-4 md:py-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "plan" && <Plan />}
          {activeTab === "journal" && <Journal />}
          {activeTab === "resources" && <Resources />}
          {activeTab === "model" && <MyModel />}
        </main>
      </div>
      <QuestSyncModal />
      <CelebrateModal />
    </>
  );
}

export default function App() {
  return (
    <QuestProvider>
      <Shell />
    </QuestProvider>
  );
}
