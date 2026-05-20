import Web3Connect from "./Web3Connect";

import Networks from "./Networks";

import Staking from "./Staking";

import Swap from "./Swap";

export default function Dashboard() {

  const token =
    localStorage.getItem("token");

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

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
          fontSize: "52px",
          marginBottom: "10px",
          letterSpacing: "4px"
        }}
      >
        CORΛX Dashboard
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
          background: "#111111",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "900px",
          border: "1px solid #222"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Session Active
        </h2>

        <p
          style={{
            color: "#22C55E",
            marginBottom: "20px"
          }}
        >
          JWT authentication active.
        </p>

        <div
          style={{
            background: "#050505",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #222",
            wordBreak: "break-all",
            color: "#888",
            marginBottom: "30px"
          }}
        >
          {token}
        </div>

        {/* ===================================== */}
        {/* STATS */}
        {/* ===================================== */}

        <div
          style={{
            display: "grid",
            gap: "15px"
          }}
        >

          <div style={cardStyle}>

            <h3>Wallet Balance</h3>

            <p style={cardValue}>
              $0.00
            </p>

          </div>

          <div style={cardStyle}>

            <h3>Staking</h3>

            <p style={cardValue}>
              Active
            </p>

          </div>

          <div style={cardStyle}>

            <h3>Network</h3>

            <p style={cardValue}>
              Multi-Chain
            </p>

          </div>

        </div>

        {/* ===================================== */}
        {/* WEB3 */}
        {/* ===================================== */}

        <Web3Connect />

        {/* ===================================== */}
        {/* NETWORKS */}
        {/* ===================================== */}

        <Networks />

        {/* ===================================== */}
        {/* STAKING */}
        {/* ===================================== */}

        <Staking />

        {/* ===================================== */}
        {/* SWAP */}
        {/* ===================================== */}

        <Swap />

        <button
          onClick={logout}
          style={logoutButton}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const cardStyle = {

  background: "#050505",

  padding: "20px",

  borderRadius: "14px",

  border: "1px solid #222"

};

const cardValue = {

  color: "#A855F7",

  marginTop: "10px",

  fontSize: "22px",

  fontWeight: "bold"

};

const logoutButton = {

  width: "100%",

  marginTop: "30px",

  padding: "14px",

  background: "#EF4444",

  border: "none",

  borderRadius: "12px",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"

};
