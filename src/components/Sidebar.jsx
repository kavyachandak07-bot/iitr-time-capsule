import { NavLink } from "react-router-dom";

function Sidebar({ darkMode, setDarkMode }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <span>⌛</span>
        <div>
          <strong>TIME</strong>
          <strong>CAPSULE</strong>
        </div>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/" end>
          🏠
          <span>Home</span>
        </NavLink>

        <NavLink to="/search">
          🔍
          <span>Search</span>
        </NavLink>

        <NavLink to="/write">
          ✎
          <span>Write a Capsule</span>
        </NavLink>

        <NavLink to="/personal">
          ♡
          <span>Personal</span>
        </NavLink>

        <NavLink to="/profile">
          ♙
          <span>Profile</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
          <span>{darkMode ? "Light mode" : "Dark mode"}</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;