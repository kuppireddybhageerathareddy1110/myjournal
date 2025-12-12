import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import EntryEditor from "./pages/EntryEditor";
import MoodBoard from "./pages/MoodBoard";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ViewEntry from "./pages/ViewEntry";
import MoodAnalytics from "./pages/MoodAnalytics";
import "./index.css";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/journal" element={<Journal />} />
       <Route path="/analytics" element={<MoodAnalytics />} />
      <Route path="/editor" element={<EntryEditor />} />
      <Route path="/entry/:entry_id" element={<ViewEntry />} />
      <Route path="/moodboard" element={<MoodBoard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
