Perfeito. Então substitua TODO o conteúdo do:

src/App.jsx

por este bloco COMPLETO já integrado com:

login

registro

JWT

dashboard

frontend CORΛX


import { useState } from "react";

import API_URL from "./api";

import Dashboard from "./Dashboard";

export default function App() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [logged, setLogged] = useState(false);

  // =====================================
  // REGISTER
  // =====================================

  const register = async () => {

    try {

      const response = await fetch(

        `${API_URL}/auth/register`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            username,
            email,
            password

          })

        }

      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(

          "token",

          data.token

        );

        setLogged(true);

        setMessage(

          "Account created successfully"

        );

      }

      else {

        setMessage(

          data.message

        );

      }

    }

    catch (error) {

      setMessage(

        "Server connection error"

      );

    }

  };

  // =====================================
  // LOGIN
  // =====================================

  const login = async () => {

    try {

      const response = await fetch(

        `${API_URL}/auth/login`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            email,
            password

          })

        }

      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(

          "token",

          data.token

        );

        setLogged(true);

        setMessage(

          "Login successful"

        );

      }

      else {

        setMessage(

          data.message

        );

      }

    }

    catch (error) {

      setMessage(

        "Server connection error"

      );

    }

  };

  // =====================================
  // DASHBOARD
  // =====================================

  if (logged) {

    return <Dashboard />;

  }

  // =====================================
  // UI
  // =====================================

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Inter"
      }}
    >

      <h1
        style={{
          color: "#A855F7",
          fontSize: "54px",
          marginBottom: "10px",
          letterSpacing: "4px"
        }}
      >
        CORΛX
      </h1>

      <p
        style={{
          color: "#888",
          marginBottom: "40px"
        }}
      >
        Money Without Borders
      </p>

      <div
        style={{
          maxWidth: "420px",
          background: "#111111",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid #222"
        }}
      >

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={register}
          style={primaryButton}
        >
          Create Account
        </button>

        <button
          onClick={login}
          style={secondaryButton}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            color: "#22C55E"
          }}
        >
          {message}
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

  marginBottom: "15px",

  borderRadius: "12px",

  border: "1px solid #333",

  background: "#050505",

  color: "white"

};

const primaryButton = {

  width: "100%",

  padding: "14px",

  background: "#A855F7",

  border: "none",

  borderRadius: "12px",

  color: "white",

  marginBottom: "10px",

  cursor: "pointer"

};

const secondaryButton = {

  width: "100%",

  padding: "14px",

  background: "transparent",

  border: "1px solid #333",

  borderRadius: "12px",

  color: "white",

  cursor: "pointer"

};
