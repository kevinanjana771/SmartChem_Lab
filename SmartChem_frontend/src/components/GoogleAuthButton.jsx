import { useEffect, useRef } from "react";
import axios from "axios";


const GoogleAuthButton = ({ onLogin }) => {
  const buttonRef = useRef(null);

  const handleGoogleResponse = async (response) => {
    try {
      console.log("✅ Google Response:", response);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { token: response.credential }
      );

      console.log("✅ Backend Response:", res.data);

      if (res.data.success && res.data.user) {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        if (onLogin) onLogin(user);
      } else {
        console.error("❌ No user returned", res.data);
      }
    } catch (err) {
      console.error("❌ Google login error:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && buttonRef.current) {
        console.log("✅ Google loaded");

        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
        });

        clearInterval(interval); // stop checking
      }
    }, 500); // check every 0.5 sec

    return () => clearInterval(interval);
  }, []);

  return <div ref={buttonRef}></div>;
};

export default GoogleAuthButton;