import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import CapsuleCard from "../components/CapsuleCard";
import "./Home.css";

const interests = [
  "CSE",
  "1st Year",
  "Coding",
  "Placements",
  "Clubs",
  "Hostel Life",
  "Campus Life",
];

function Home() {
  const [capsules, setCapsules] = useState([]);
  const [activeInterest, setActiveInterest] = useState("CSE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "capsules")
        );

        const capsuleData = snapshot.docs.map((doc) => {
  const data = doc.data();

  console.log("FIRESTORE CAPSULE:", data);

  return {
    id: doc.id,
    ...data,
  };
});

        setCapsules(capsuleData);
      } catch (error) {
        console.error("Error fetching capsules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const filteredCapsules = capsules.filter((capsule) =>
    capsule.tags?.includes(activeInterest)
  );

  return (
    <main className="home-page">

      {/* HEADER */}

      <section className="home-header">

        <p className="home-eyebrow">
          YOUR CAPSULE FEED
        </p>

        <h1>
          Things worth
          <br />
          <span>passing on.</span>
        </h1>

        <p className="home-subtitle">
          Advice, experiences and little lessons
          <br />
          from one IITR generation to the next.
        </p>

      </section>


      {/* INTEREST FILTERS */}

      <nav className="interest-bar">

        {interests.map((interest) => (
          <button
            key={interest}
            className={`interest-tag ${
              activeInterest === interest
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveInterest(interest)
            }
          >
            {interest}
          </button>
        ))}

        <button className="interest-tag more-tag">
          ...
        </button>

      </nav>


      {/* FEED */}

      <section className="capsule-feed">

        {loading ? (

          <p>Loading capsules...</p>

        ) : filteredCapsules.length > 0 ? (

          filteredCapsules.map((capsule) => (

            <CapsuleCard
              key={capsule.id}
              title={capsule.title}
              message={capsule.message}
              tags={capsule.tags}
              likes={capsule.likes || 0}
              date={
                capsule.createdAt
                  ? capsule.createdAt
                      .toDate()
                      .toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                  : ""
              }
            />

          ))

        ) : (

          <div className="empty-feed">
            <p>
              No capsules found for this interest yet.
            </p>
          </div>

        )}

      </section>

    </main>
  );
}

export default Home;