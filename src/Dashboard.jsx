import logo from "./logo.png";

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
        padding: "25px",
        color: "white",
        fontFamily: "Inter"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px"
          }}
        >

          <img
            src={logo}
            alt="CORΛX"
            style={{
              width: "85px",
              filter:
                "drop-shadow(0 0 20px rgba(168,85,247,0.5))"
            }}
          />

          <div>

            <h1
              style={{
                color: "#A855F7",
                fontSize: "42px",
                letterSpacing: "5px",
                marginBottom: "8px"
              }}
            >
              CORΛX
            </h1>

            <p
              style={{
                color: "#888"
              }}
            >
              Money Without Borders
            </p>

          </div>

        </div>

        <button
          onClick={logout}
          style={{
            padding: "12px 20px",
            background: "#EF4444",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN CARD */}

      <div
        style={{
          background: "#111111",
          border: "1px solid #222",
          borderRadius: "24px",
          padding: "30px"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          CORΛX Dashboard
        </h2>

        <p
          style={{
            color: "#22C55E",
            marginBottom: "20px"
          }}
        >
          Authentication Active
        </p>

        <div
          style={{
            background: "#050505",
            border: "1px solid #222",
            borderRadius: "12px",
            padding: "15px",
            wordBreak: "break-all",
            color: "#666",
            marginBottom: "30px"
          }}
        >
          {token}
        </div>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px"
          }}
        >

          <div style={cardStyle}>

            <h3>Wallet Balance</h3>

            <p style={valueStyle}>
              $16,390
            </p>

          </div>

          <div style={cardStyle}>

            <h3>Staking</h3>

            <p style={valueStyle}>
              12,500 CRX
            </p>

          </div>

          <div style={cardStyle}>

            <h3>Network</h3>

            <p style={valueStyle}>
              Multi-Chain
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const cardStyle = {

  background: "#050505",

  border: "1px solid #222",

  borderRadius: "18px",

  padding: "22px"

};

const valueStyle = {

  color: "#A855F7",

  fontSize: "24px",

  fontWeight: "bold",

  marginTop: "12px"

};
