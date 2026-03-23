import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const GoogleAuthButton = ({ setUser }) => {
  const navigate = useNavigate();
  const handleSuccess = async (response) => {
    console.log("✅ Google Response:", response);

    try {
      const token = response.credential;
      console.log("📌 Token:", token);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const res = await axios.post(`${baseUrl}/auth/google`, {
        token,
      });

      console.log("✅ Backend Response:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (setUser) setUser(res.data.user);

      alert("Google Login Successful ✅");
      navigate("/dashboard");

    } catch (err) {
      console.error("❌ Backend Error:", err.response?.data || err.message);
      alert("Google Login failed on backend ❌");
    }
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed ❌")}
      />
    </div>
  );
};

export default GoogleAuthButton;
