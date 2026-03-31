import { useState } from "react";
import type { SubmitEvent } from "react";
// import axios from "axios";

import { MdOutlineMarkEmailRead } from "react-icons/md";
import "../styles/SignInSignUp.css";
import axios from "axios";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/send-reset-email`,
        {
          email,
        },
      );
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message);
      } else {
        alert("Failed to update password");
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        {submitted ? (
          <div className="password-sent">
            <MdOutlineMarkEmailRead size={48} color="#5048e5" />
            <p>
              We have sent the update password link to your email, please check
              that !
            </p>
          </div>
        ) : (
          <>
            <h2 className="signin-title">Update your password</h2>
            <p className="signin-subtitle">
              Enter your email link, we will send you the recovery link
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="signin-btn">
                Update Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
