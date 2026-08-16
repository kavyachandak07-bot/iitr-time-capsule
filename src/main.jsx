import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import AuthCallback from "./AuthCallback.jsx";

import Home from "./pages/Home.jsx";
import WriteCapsule from "./pages/WriteCapsule.jsx";
import Search from "./pages/Search.jsx";
import Personal from "./pages/Personal.jsx";
import Profile from "./pages/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        {/* Main application layout */}
        <Route path="/" element={<App />}>

          {/* Home */}
          <Route
            index
            element={<Home />}
          />

          {/* Write Capsule */}
          <Route
            path="write"
            element={<WriteCapsule />}
          />

          {/* Search */}
          <Route
            path="search"
            element={<Search />}
          />

          {/* Personal */}
          <Route
            path="personal"
            element={<Personal />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>


        {/* Channeli OAuth callback */}
        <Route
          path="/auth/callback"
          element={<AuthCallback />}
        />

      </Routes>

    </BrowserRouter>
  </StrictMode>
);