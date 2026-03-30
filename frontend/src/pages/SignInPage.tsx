import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import type { RootState } from "../store";

import "../styles/SignInSignUp.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/products", { replace: true });
    }
  }, [token, navigate]);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid Email input!");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );
      dispatch(
        setCredentials({
          token: response.data.token,
          user: response.data.user,
        }),
      );
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data.message;
        if (msg === "User not existed") {
          setEmailError(msg);
        } else if (msg === "Invalid password") {
          setPasswordError(msg);
        } else {
          setEmailError(msg);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="signin-title">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={email}
              className={emailError ? "input-error" : ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {emailError && <span className="error-msg">{emailError}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className={passwordError ? "input-error" : ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
            Sign In
          </button>
        </form>
        <div className="signin-footer">
          <div>
            <span>Don't have an account?</span>
            <Link to={"/signup"}>Sign up</Link>
          </div>
          <Link to={"/profile/password"}>Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;
