import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodayPage from "./components/TodayPage";
import FullRoutinePage from "./components/FullRoutinePage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodayPage />} />
        <Route path="/full-routine" element={<FullRoutinePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
