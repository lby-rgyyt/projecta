import { useState } from "react";
import type { SubmitEvent } from 'react'
import axios from "axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            email,
            password
          })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      Sign In Page
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};
export default SignUpPage;
