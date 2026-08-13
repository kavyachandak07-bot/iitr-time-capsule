import { useEffect, useState } from "react";

function AuthCallback() {
  const [message, setMessage] = useState("Completing Channeli login...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    if (error) {
      setMessage("Channeli login was cancelled.");
      return;
    }

    if (!code) {
      setMessage("No authorization code received.");
      return;
    }

    console.log("Authorization code:", code);
    console.log("State:", state);

    setMessage("Authorization code received!");
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default AuthCallback;