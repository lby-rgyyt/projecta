import axios from "axios";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const {token} = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (newPassword !== repeatNewPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
          token,
          newPassword,
        });
        alert("Password reset successfully");
        navigate("/signin");
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <div>
      <div>
        <label>New Password</label>
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
      <div>
        <label>New Password</label>
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
      <button onClick={handleClick}>Change Password</button>
    </div>
  );
};

export default ResetPasswordPage;
