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
import FloatingMerchButton from "./components/FloatingMerchButton";
// Remove the PromoBanner import

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
      title: "Discovering Rhythm",
      text: "Bob is your ordinary working man. On his way to work he has a clash with a robot, who is blocking a path due to a known criminal on the run, leading Bob to go down a route he had never taken before. Down back alleyways, he uses his electrical know-how, and his new-found fighting ability, to get to work on time, not knowing that some one may be watchinging him...",
      imageSrc: bob,
      imageAlignment: "right",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
      learnMoreLink: "/character/bob",
    },
    {
      title: "Sound of Resistance",
      text: "A young and confident woman, Lyra's love for making music is strong, and she is determined to spread the joys of music to the world. She is a known by the city's police force, but Lyra can always use her quick wit and athletic ability to escape and live to compose another day.",
      imageSrc: lyra,
      imageAlignment: "left",
      imageStyle: { maxHeight: "650px", maxWidth: "750px" },
      learnMoreLink: "/character/lyra",
    },
    {
      title: "Fighting for the Past",
      text: "Jett moves in the shadows to supply Lyra with everything she needs to spread music. Jett is the son of two once famous musicians who were taken by the state. Being force to live alone for his younger life taught him how to fight and fend for himself. On this particular day, he breaks into a warehouse to steal a disc for Lyra to burn her music onto, while Lyra distracts the city's police force.",
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
      {/* Remove the PromoBanner component */}
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
      <FloatingMerchButton />
      <Analytics />
    </Router>
  );
}

export default App;
