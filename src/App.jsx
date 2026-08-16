import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default App;