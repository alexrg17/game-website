import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import GamePage from "./pages/GamePage";
import ProtectedRoute from "./components/ProtectedRoute";
import rockstar1 from "./assets/AllTogether1.png";
import bob from "./assets/Bob.png";
import lyra from "./assets/Lyra.png";
import jett from "./assets/Jett.png";
import { Analytics } from "@vercel/analytics/react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AwakeningPage from "./pages/AwakeningPage";
import BobPage from "./pages/BobPage";
import LyraPage from "./pages/LyraPage";
import JettPage from "./pages/JettPage";

// Define the HomePage using your existing Header and Body components
function HomePage() {
  const blocks = [
    {
      title: "The Awakening Begins",
      text: "Meet Bob, Lyra, and Jett — three unlikely allies in the city of Silton where music is forbidden. Together, they ignite the spark of rebellion and show the world what it's been missing. Join them on their journey to bring rhythm back to a world that has forgotten the power of music.",
      imageSrc: rockstar1,
      imageAlignment: "left",
      learnMoreLink: "/story/awakening",
    },
    {
      title: "Rediscovering Rhythm",
      text: "A working man turned rebel, Bob's accidental clash with a music bot reignites memories of melody. Hesitant but driven by instinct, he steps into a world he'd long forgotten. His journey from ordinary citizen to revolutionary begins with a single beat that awakens something deep within him.",
      imageSrc: bob,
      imageAlignment: "right",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
      learnMoreLink: "/character/bob",
    },
    {
      title: "Sound of Resistance",
      text: "Once a rising composer, now a wanted music outlaw. Lyra dodges security bots while distributing her illegal tracks, determined to bring music back to the people. Her compositions are more than just songs—they're messages of hope and rebellion that inspire others to join the cause.",
      imageSrc: lyra,
      imageAlignment: "left",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
      learnMoreLink: "/character/lyra",
    },
    {
      title: "Behind the Beat",
      text: "Quiet but committed, Jett moves in the shadows to supply Lyra with everything she needs to fight back. Fueled by loss, his mission is to keep the underground alive. His technical genius and resourcefulness provide the rebellion with the tools they need to spread their message across Silton.",
      imageSrc: jett,
      imageAlignment: "right",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
      learnMoreLink: "/character/jett",
    },
  ];

  return <Body blocks={blocks} />;
}

function App() {
  return (
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

        {/* New story and character pages */}
        <Route path="/story/awakening" element={<AwakeningPage />} />
        <Route path="/character/bob" element={<BobPage />} />
        <Route path="/character/lyra" element={<LyraPage />} />
        <Route path="/character/jett" element={<JettPage />} />
      </Routes>
      <Footer />
      <Analytics />
    </Router>
  );
}

export default App;
