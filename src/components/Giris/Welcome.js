import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "./Style_Welcome_module.css";

function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/homepage"))
      .catch((err) => alert(err.message));
  };
  const handleRegister = () => {
    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert("Please confirm that password are the same");
    } else {
      createUserWithEmailAndPassword(
        auth,
        registerInformation.email,
        registerInformation.password
      )
        .then(() => navigate("/homepage"))
        .catch((err) => alert(err.message));
    }
  };
  return (
    <div className="welcome_container">
      <h1>izledim.</h1>
      {isRegistering === true ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={registerInformation.email}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={registerInformation.password}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                password: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerInformation.confirmPassword}
            onChange={(e) =>
              setRegisterInformation({
                ...registerInformation,
                confirmPassword: e.target.value,
              })
            }
          />
          <button onClick={handleRegister}>Register</button>
          <p className="welcome_link" onClick={() => setIsRegistering(false)}>
            Already have an account?
          </p>
        </>
      ) : (
        <>
          <div>
            <h4>Email</h4>
            <input
              type="email"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>

          <div>
            <h4>Password</h4>
            <input
              type="password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button onClick={handleSignIn}>Sign In</button>
          <p className="welcome_link" onClick={() => setIsRegistering(true)}>
            Create an account.
          </p>
        </>
      )}
    </div>
  );
}

export default Welcome;
