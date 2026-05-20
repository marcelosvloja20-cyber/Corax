import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        background: "#050505",
        color: "#F5F5F5",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <h1
        style={{
          fontSize: "52px",
          marginBottom: "10px",
          color: "#A855F7",
          letterSpacing: "4px"
        }}
      >
        CORΛX
      </h1>

      <p
        style={{
          color: "#999",
          marginBottom: "50px"
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
        <h2
          style={{
            marginBottom: "10px"
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            color: "#888",
            marginBottom: "30px"
          }}
        >
          Access your decentralized financial ecosystem.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#050505",
            color: "white"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#050505",
            color: "white"
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: "#A855F7",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "12px"
          }}
        >
          Login
        </button>

        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "transparent",
            color: "white",
            cursor: "pointer"
          }}
        >
          Create Account
        </button>
      </div>

      <div
        style={{
          marginTop: "70px"
        }}
      >
        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Why CORΛX?
        </h2>

        <div
          style={{
            display: "grid",
            gap: "20px"
          }}
        >
          <div>
            <h3 style={{ color: "#A855F7" }}>
              Instant Transfers
            </h3>
            <p style={{ color: "#888" }}>
              Lightning-fast settlements worldwide.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#A855F7" }}>
              Multi-Chain
            </h3>
            <p style={{ color: "#888" }}>
              Cross-network compatibility.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#A855F7" }}>
              Self Custody
            </h3>
            <p style={{ color: "#888" }}>
              Full ownership of your assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
          }
