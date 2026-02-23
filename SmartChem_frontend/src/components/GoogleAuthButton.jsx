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

      const res = await axios.post("http://localhost:5001/api/auth/google", {
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
