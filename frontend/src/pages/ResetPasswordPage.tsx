import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/SignInSignUp.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (newPassword !== repeatNewPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password`,
        {
          token,
          newPassword,
        },
      );
      alert("Password reset successfully");
      navigate("/signin");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message);
      } else {
        alert("Failed to reset password");
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="signin-title">Reset your password</h2>
        <div className="form-group">
          <label>New Password</label>
          <div className="password-input">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showRepeatNewPassword ? "text" : "password"}
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowRepeatNewPassword(!showRepeatNewPassword)}
            >
              {showRepeatNewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="signin-btn" onClick={handleClick}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
