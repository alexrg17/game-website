import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import Register page
import Leaderboard from "./pages/Leaderboard"; // Import Leaderboard page
import rockstar1 from "./assets/rockstar-1.png"; // Import the image

// Define the HomePage using your existing Header and Body components
function HomePage() {
  // Define five content blocks with alternating image alignments
  const blocks = [
    {
      title: "Block 1: Welcome to Los Santos",
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

  return (
    <div>
      <Header />
      <Body blocks={blocks} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
