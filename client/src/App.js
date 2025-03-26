<<<<<<< HEAD
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

// Define the HomePage using your existing Header and Body components
function HomePage() {
  const blocks = [
    {
      title: "Block 1: Welcome to Starilum game.",
      text: "Discover the vibrant and gritty world of Los Santos. Experience the thrill from the very first block.",
      imageSrc: rockstar1,
      imageAlignment: "left",
    },
    {
      title: "Block 2: Adventures Await",
      text: "Embark on a journey full of surprises and challenges as you navigate the urban jungle.",
      imageSrc: rockstar1,
      imageAlignment: "right",
    },
    {
      title: "Block 3: The Underworld",
      text: "Dive deep into the dark corners of the city, where secrets and danger lurk at every turn.",
      imageSrc: rockstar1,
      imageAlignment: "left",
    },
    {
      title: "Block 4: Hidden Secrets",
      text: "Uncover hidden stories and untold legends that make Los Santos truly unforgettable.",
      imageSrc: rockstar1,
      imageAlignment: "right",
    },
    {
      title: "Block 5: The Final Showdown",
      text: "Prepare for the ultimate challenge as you face the city's most formidable foes.",
      imageSrc: rockstar1,
      imageAlignment: "left",
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
        </Routes>
      </Router>
    </AuthProvider>
=======
function App() {
  return (
    <div>
      <h1>Game Website - Setup Complete</h1>
    </div>
>>>>>>> origin/backend-dev
  );
}

export default App;
