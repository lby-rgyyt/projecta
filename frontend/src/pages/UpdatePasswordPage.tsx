import { useState } from "react";
import type { SubmitEvent } from "react";
// import axios from "axios";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <p>
          We have sent the update password link to your email, please check
          that!
        </p>
      ) : (
        <>
          <p>Update your password</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button type="submit">Update Password</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdatePasswordPage;
