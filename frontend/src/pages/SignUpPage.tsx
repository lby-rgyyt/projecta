import { useState } from "react";
import type { SubmitEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "../styles/SignInSignUp.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid Email input!");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Invalid password input!");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          email,
          password,
        },
      );
      console.log(response.data);
      navigate('/signin');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.message;
        if (error.response.status === 409) {
          setEmailError(msg || "Email already in use");
        } else {
          setEmailError(msg || "Registration failed");
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="signin-title">Sign up an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className={emailError ? "input-error" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error-msg">{emailError}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className={passwordError ? "input-error" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <span className="error-msg">{passwordError}</span>
            )}
          </div>
          <button type="submit" className="signin-btn">
            Create account
          </button>
        </form>
        <div className="signin-footer">
          <span>
            Already have an account? <Link to="/signin">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
