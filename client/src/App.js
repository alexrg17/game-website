import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import GamePage from "./pages/GamePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import rockstar1 from "./assets/AllTogether1.png";
import bob from "./assets/Bob.png";
import lyra from "./assets/Lyra.png";
import jett from "./assets/Jett.png";
import { Analytics } from "@vercel/analytics/react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Define the HomePage using your existing Header and Body components
function HomePage() {
  const blocks = [
    {
      title: "The Awakening Begins",
      text: "Meet Bob, Lyra, and Jett — three unlikely allies in the city of Silton where music is forbidden. Together, they ignite the spark of rebellion and show the world what it's been missing.",
      imageSrc: rockstar1,
      imageAlignment: "left",
    },
    {
      title: "Rediscovering Rhythm",
      text: "A working man turned rebel, Bob’s accidental clash with a music bot reignites memories of melody. Hesitant but driven by instinct, he steps into a world he’d long forgotten.",
      imageSrc: bob,
      imageAlignment: "right",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
    },
    {
      title: "Sound of Resistance",
      text: "Once a rising composer, now a wanted music outlaw. Lyra dodges security bots while distributing her illegal tracks, determined to bring music back to the people.",
      imageSrc: lyra,
      imageAlignment: "left",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
    },
    {
      title: "Behind the Beat",
      text: "Quiet but committed, Jett moves in the shadows to supply Lyra with everything she needs to fight back. Fueled by loss, his mission is to keep the underground alive.",
      imageSrc: jett,
      imageAlignment: "right",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
    },
  ];

  return <Body blocks={blocks} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Analytics />
      </Router>
    </AuthProvider>
  );
}

export default App;
