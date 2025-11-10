import { useState } from "react";
import LoginPage from "./components/LoginPage";
import ProfileSetup from "./components/ProfileSetup";
import DashboardPage from "./components/DashboardPage";

type Page = "login" | "profile" | "dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const handleLogin = () => {
    setCurrentPage("profile");
  };

  const handleProfileComplete = () => {
    setCurrentPage("dashboard");
  };

  return (
    <div className="w-full h-screen overflow-auto">
      {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
      {currentPage === "profile" && (
        <ProfileSetup onComplete={handleProfileComplete} />
      )}
      {currentPage === "dashboard" && <DashboardPage />}
    </div>
  );
}
