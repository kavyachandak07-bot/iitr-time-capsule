import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CapsuleCard from "../components/CapsuleCard";
import { db, auth, storage } from "../firebase";
import "./WriteCapsule.css";


function WriteCapsule() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [sealed, setSealed] = useState(false);
  const [saving, setSaving] = useState(false);

  const tags = {
    Academic: [
      "CSE",
      "ECE",
      "EE",
      "ME",
      "Civil",
      "Chemical",
      "Mathematics",
    ],

    Year: [
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year",
    ],

    Topics: [
      "Coding",
      "Placements",
      "Research",
      "Clubs",
      "Hostel Life",
      "Campus Life",
      "Mental Health",
      "Routine",
      "Well Being",
    ],
  };

  /* =========================
     TAG SELECTION
  ========================= */

  const toggleTag = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  };

  /* =========================
     IMAGE
  ========================= */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  /* =========================
     AUDIO
  ========================= */

  const handleAudio = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAudio(file);
    }
  };

  /* =========================
     SEAL CAPSULE
  ========================= */

  const handleSubmit = async () => {
  if (!title.trim()) {
    alert("Please add a heading.");
    return;
  }

  if (!message.trim()) {
    alert("Please write your message.");
    return;
  }

  if (selectedTags.length === 0) {
    alert("Please select at least one tag.");
    return;
  }

  try {
    setSaving(true);

    const authorId = auth.currentUser?.uid || "test-user";

    let imageUrl = null;
    let audioUrl = null;

    /* =========================
       UPLOAD IMAGE
    ========================= */

    if (image) {
      const imageRef = ref(
        storage,
        `capsules/${authorId}/${Date.now()}-${image.name}`
      );

      await uploadBytes(imageRef, image);

      imageUrl = await getDownloadURL(imageRef);
    }

    /* =========================
       UPLOAD AUDIO
    ========================= */

    if (audio) {
      const audioRef = ref(
        storage,
        `capsules/${authorId}/audio-${Date.now()}-${audio.name}`
      );

      await uploadBytes(audioRef, audio);

      audioUrl = await getDownloadURL(audioRef);
    }

    /* =========================
       SAVE CAPSULE
    ========================= */

    await addDoc(collection(db, "capsules"), {
      title: title.trim(),
      message: message.trim(),

      tags: selectedTags,

      likes: 0,

      authorId,

      createdAt: serverTimestamp(),

      imageUrl,
      audioUrl,
    });

    console.log("Capsule successfully saved!");

    setSealed(true);

  } catch (error) {
    console.error("Error sealing capsule:", error);

    alert("Something went wrong while sealing your capsule.");

  } finally {
    setSaving(false);
  }
};

  /* =========================
     WRITE ANOTHER
  ========================= */

  const writeAnother = () => {
    setTitle("");
    setMessage("");
    setSelectedTags([]);
    setImage(null);
    setAudio(null);
    setSealed(false);
  };

  return (
    <main className="write-page">

      {/* HEADER */}

      <section className="write-header">

        <p className="write-eyebrow">
          LEAVE SOMETHING BEHIND
        </p>

        <h1>
          Write a Capsule
        </h1>

        <p>
          Share something you wish someone had told you
          when you first arrived at IITR.
        </p>

      </section>


      {/* MESSAGE */}

      <section className="write-card">

        <div className="field-heading">

          <label>
            Your Message <span>*</span>
          </label>

          <small>
            {message.length}/1000
          </small>

        </div>


        <input
          type="text"
          className="title-input"
          placeholder="Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
        />


        <textarea
          className="message-input"
          placeholder="Write your advice here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
        />

      </section>


      {/* VOICE NOTE */}

      <section className="write-card">

        <div className="field-heading">

          <label>
            Voice Note
          </label>

          <small>
            Optional
          </small>

        </div>


        <label className="upload-box">

          <input
            type="file"
            accept="audio/*"
            onChange={handleAudio}
            hidden
          />

          <span className="upload-icon">
            🎙️
          </span>

          <strong>
            {audio ? audio.name : "Upload a voice note"}
          </strong>

          <small>
            {audio
              ? "Audio selected"
              : "Click to browse your files"}
          </small>

        </label>

      </section>


      {/* IMAGE */}

      <section className="write-card">

        <div className="field-heading">

          <label>
            Image
          </label>

          <small>
            Optional
          </small>

        </div>


        <label className="upload-box">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />

          <span className="upload-icon">
            ▣
          </span>

          <strong>
            {image ? image.name : "Upload an image"}
          </strong>

          <small>
            {image
              ? "Image selected"
              : "Click to browse your files"}
          </small>

        </label>

      </section>


      {/* TAGS */}

      <section className="write-card tags-card">

        <div className="field-heading">

          <label>
            Select Tags <span>*</span>
          </label>

          <small>
            Help others find your capsule.
          </small>

        </div>


        {Object.entries(tags).map(
          ([group, groupTags]) => (

            <div
              className="tag-group"
              key={group}
            >

              <h3>
                {group}
              </h3>


              <div className="tag-list">

                {groupTags.map((tag) => (

                  <button
                    type="button"
                    key={tag}
                    className={`tag ${
                      selectedTags.includes(tag)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>

                ))}

              </div>

            </div>

          )
        )}

      </section>


      {/* SEAL BUTTON */}

      <div className="write-actions">

        <button
          className="seal-btn"
          type="button"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving
            ? "Sealing..."
            : "Seal Capsule ✦"}
        </button>

      </div>


      {/* SEALED SCREEN */}

      {sealed && (

        <div className="sealed-overlay">

          <div className="sealed-card">

            <div className="sealed-symbol">
              ✦
            </div>


            <p className="sealed-eyebrow">
              CAPSULE SEALED
            </p>


            <h2>
              Your words are now
              <br />
              part of the capsule.
            </h2>


            <p className="sealed-text">
              Someday, another IITR student
              might find exactly what they
              needed to hear.
            </p>


            <button
              className="seal-btn"
              onClick={writeAnother}
            >
              Write Another Capsule
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

export default WriteCapsule;