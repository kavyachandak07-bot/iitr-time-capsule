import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [capsules, setCapsules] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const loadCapsules = async () => {
    try {
      const snapshot = await getDocs(collection(db, "capsules"));

      const capsuleList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCapsules(capsuleList);
    } catch (error) {
      console.error("Error loading capsules:", error);
    }
  };

  useEffect(() => {
    loadCapsules();
  }, []);

  const saveCapsule = async () => {
    if (!message.trim() || !category) {
      alert("Please write a message and choose a category.");
      return;
    }

    try {
      await addDoc(collection(db, "capsules"), {
        message: message.trim(),
        category: category,
        createdAt: new Date(),
      });

      alert("Capsule saved!");

      setMessage("");
      setCategory("");

      loadCapsules();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      {/* NAVBAR */}
      <nav className="navbar">
  <div className="logo">
    <span className="logo-icon">⌛</span>
    <span>Time Capsule</span>
  </div>

  <div className="nav-actions">

    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>

    <button
  className="login-btn"
  onClick={() => {
    window.location.href = "http://localhost:5001/auth/channeli";
  }}
>
  Login with Channeli
</button>

  </div>
</nav>


      {/* HERO */}
      <section className="hero">

        <div className="hero-content">
          <p className="eyebrow">IIT ROORKEE • ACROSS GENERATIONS</p>

          <h1>
            Things worth
            <span> passing on.</span>
          </h1>

          <p className="hero-text">
            Advice, experiences and lessons from one IITR batch
            to the next.
          </p>

          <div className="hero-buttons">
            <a href="#write" className="primary-btn">
              Write a Capsule
            </a>

            <a href="#capsules" className="secondary-btn">
              Explore Capsules
            </a>
          </div>
        </div>

      </section>


      {/* WRITE */}
      <section className="write-section" id="write">

        <div className="section-heading">
          <p className="eyebrow">LEAVE SOMETHING BEHIND</p>

          <h2>Write a Capsule</h2>

          <p>
            What do you wish someone had told you when you
            first arrived at IITR?
          </p>
        </div>

        <div className="capsule-form">

          <textarea
            placeholder="Write something your junior should know..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="form-bottom">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              <option value="Academics">Academics</option>
              <option value="Placements">Placements</option>
              <option value="Coding">Coding</option>
              <option value="Research">Research</option>
              <option value="Hostel Life">Hostel Life</option>
              <option value="Clubs">Clubs</option>
              <option value="Campus Life">Campus Life</option>
            </select>

            <button
              className="primary-btn"
              onClick={saveCapsule}
            >
              Seal Capsule ✦
            </button>

          </div>

        </div>

      </section>


      {/* CAPSULE FEED */}
      <section className="feed-section" id="capsules">

        <div className="section-heading">
          <p className="eyebrow">FROM THE IITR COMMUNITY</p>

          <h2>Explore Capsules</h2>

          <p>
            Little pieces of wisdom left behind by students
            who came before you.
          </p>
        </div>

        <div className="capsule-grid">

          {capsules.length === 0 ? (
            <p className="empty">
              No capsules yet. Be the first to leave one.
            </p>
          ) : (
            capsules.map((capsule) => (
              <article className="capsule-card" key={capsule.id}>

                <div className="card-top">
                  <span className="category">
                    {capsule.category}
                  </span>

                  <span className="capsule-symbol">
                    ✦
                  </span>
                </div>

                <p className="capsule-message">
                  “{capsule.message}”
                </p>

                <div className="card-bottom">
                  <span>Anonymous IITR student</span>
                </div>

              </article>
            ))
          )}

        </div>

      </section>


      {/* FOOTER */}
      <footer>
        <p>⌛ IITR Time Capsule</p>
        <span>For the batches that came before, and those yet to come.</span>
      </footer>

    </div>
  );
}

export default App;