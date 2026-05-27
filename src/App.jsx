import { useState } from "react";

import Dashboard from "./Dashboard";

import logo from "./logo.png";

import {
  loginUser,
  registerUser
} from "./api";

export default function App() {

  const [isLogin, setIsLogin] =
    useState(true);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = async () => {

    try {

      setLoading(true);

      const response =
        await loginUser(
          email,
          password
        );

      if (response.token) {

        localStorage.setItem(
          "token",
          response.token
        );

        window.location.reload();

      } else {

        alert(
          response.message ||
          "Login failed"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Server error");

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // REGISTER
  // =====================================

  const handleRegister = async () => {

    try {

      setLoading(true);

      const response =
        await registerUser(
          username,
          email,
          password
        );

      if (response.success) {

        alert(
          "Account created successfully"
        );

        setIsLogin(true);

      } else {

        alert(
          response.message ||
          "Register failed"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Server error");

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // DASHBOARD
  // =====================================

  if (token) {

    return <Dashboard />;

  }

  // =====================================
  // AUTH SCREEN
  // =====================================

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Inter",
        color: "white"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111111",
          border: "1px solid #222",
          borderRadius: "24px",
          padding: "40px",
          boxShadow:
            "0 0 40px rgba(168,85,247,0.15)"
        }}
      >

        {/* LOGO */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "35px"
          }}
        >

          <img
            src={logo}
            alt="CORΛX"
            style={{
              width: "120px",
              marginBottom: "20px",
              filter:
                "drop-shadow(0 0 20px rgba(168,85,247,0.5))"
            }}
          />

          <h1
            style={{
              color: "#A855F7",
              fontSize: "48px",
              letterSpacing: "6px",
              marginBottom: "10px"
            }}
          >
            CORΛX
          </h1>

          <p
            style={{
              color: "#888",
              textAlign: "center"
            }}
          >
            Money Without Borders
          </p>

        </div>

        {/* TITLE */}

        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center"
          }}
        >
          {
            isLogin
              ? "Welcome Back"
              : "Create Account"
          }
        </h2>

        {/* USERNAME */}

        {
          !isLogin && (

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              style={inputStyle}
            />

          )
        }

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* BUTTON */}

        <button
          onClick={
            isLogin
              ? handleLogin
              : handleRegister
          }
          disabled={loading}
          style={buttonStyle}
        >

          {
            loading
              ? "Loading..."
              : isLogin
              ? "Login"
              : "Create Account"
          }

        </button>

        {/* TOGGLE */}

        <p
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#888",
            cursor: "pointer"
          }}
        >

          {
            isLogin
              ? "Create new account"
              : "Already have an account?"
          }

        </p>

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "18px",

  background: "#050505",

  border: "1px solid #222",

  borderRadius: "12px",

  color: "white",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box"

};

const buttonStyle = {

  width: "100%",

  padding: "14px",

  background: "#A855F7",

  border: "none",

  borderRadius: "12px",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: "15px",

  marginTop: "10px"

};
