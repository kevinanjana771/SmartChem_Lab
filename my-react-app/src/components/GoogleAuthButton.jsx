import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuthButton = ({ setUser }) => {
  const handleSuccess = async (response) => {
    const token = response.credential || response.access_token;
    console.log("Google Token:", token);

    try {
      // Send token to backend (backend likely runs on 5001)
      const res = await axios.post("http://localhost:5001/auth/google", {
        token,
      });

      console.log("Backend Response:", res.data);

      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (setUser) setUser(res.data.user);
      }

      alert("Google Login Successful ✅");
    } catch (err) {
      console.error("Backend error:", err?.response || err);
      alert("Google Login failed on backend ❌");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => alert("Google Login Failed ❌"),
    flow: "implicit"
  });

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      {/* Primary: rendered Google button (if script loads) */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed ❌")}
      />

    </div>
  );
};

export default GoogleAuthButton;
