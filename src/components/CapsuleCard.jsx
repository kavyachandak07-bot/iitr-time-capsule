import { useState } from "react";
import "./CapsuleCard.css";

function CapsuleCard({
  title,
  message,
  tags = [],
  date,
  likes = 0,
  image,
  audio,
}) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const displayedLikes = liked ? likes + 1 : likes;

  return (
    <article className="capsule-card">

      {/* =========================
          TOP
      ========================= */}

      <div className="capsule-card-top">

        <div className="capsule-tags">

          {tags.map((tag) => (
            <span
              className="capsule-tag"
              key={tag}
            >
              {tag}
            </span>
          ))}

        </div>


        <button
          className={`bookmark-btn ${
            bookmarked ? "bookmarked" : ""
          }`}
          onClick={() =>
            setBookmarked((current) => !current)
          }
          aria-label="Bookmark capsule"
        >
          {bookmarked ? "🔖" : "♡"}
        </button>

      </div>


      {/* =========================
          TITLE
      ========================= */}

      {title && (
        <h2 className="capsule-title">
          {title}
        </h2>
      )}


      {/* =========================
          IMAGE
      ========================= */}

      {image && (
        <div className="capsule-image">

          <img
            src={
              typeof image === "string"
                ? image
                : URL.createObjectURL(image)
            }
            alt=""
          />

        </div>
      )}


      {/* =========================
          MESSAGE
      ========================= */}

      <p className="capsule-message">
        {message}
      </p>


      {/* =========================
          AUDIO
      ========================= */}

      {audio && (
        <div className="capsule-audio">
          🎙️ Voice note attached
        </div>
      )}


      {/* =========================
          FOOTER
      ========================= */}

      <div className="capsule-card-footer">

        <button
          className={`like-btn ${
            liked ? "liked" : ""
          }`}
          onClick={() =>
            setLiked((current) => !current)
          }
          aria-label="Like capsule"
        >
          <span className="heart">
            {liked ? "♥" : "♡"}
          </span>

          <span>
            {displayedLikes}
          </span>
        </button>


        <span className="capsule-date">
          {date || "Today"}
        </span>

      </div>

    </article>
  );
}

export default CapsuleCard;