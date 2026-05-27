export default function Landing({ enterApp }) {

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter"
      }}
    >

      {/* HERO */}

      <div
        style={{
          padding: "80px 25px",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            fontSize: "72px",
            color: "#A855F7",
            letterSpacing: "8px",
            marginBottom: "20px"
          }}
        >
          CORΛX
        </h1>

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px"
          }}
        >
          Money Without Borders
        </h2>

        <p
          style={{
            color: "#888",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "32px"
          }}
        >
          Decentralized multi-chain payments,
          staking and crypto finance built
          for the modern world.
        </p>

        {/* BUTTONS */}

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={enterApp}
            style={primaryButton}
          >
            Launch App
          </button>

          <button
            style={secondaryButton}
          >
            Explore Ecosystem
          </button>

        </div>

      </div>

      {/* FEATURES */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 25px 80px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px"
        }}
      >

        <div style={cardStyle}>

          <h3 style={titleStyle}>
            Instant Payments
          </h3>

          <p style={textStyle}>
            Send and receive crypto globally
            with ultra low fees.
          </p>

        </div>

        <div style={cardStyle}>

          <h3 style={titleStyle}>
            Multi-Chain
          </h3>

          <p style={textStyle}>
            Ethereum, Polygon, BNB Chain and
            future integrations.
          </p>

        </div>

        <div style={cardStyle}>

          <h3 style={titleStyle}>
            Secure Wallet
          </h3>

          <p style={textStyle}>
            Self-custody architecture with
            JWT authentication.
          </p>

        </div>

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const cardStyle = {

  background: "#111111",

  border: "1px solid #222",

  borderRadius: "24px",

  padding: "30px"

};

const titleStyle = {

  color: "#A855F7",

  marginBottom: "15px"

};

const textStyle = {

  color: "#888",

  lineHeight: "28px"

};

const primaryButton = {

  background: "#A855F7",

  border: "none",

  color: "white",

  padding: "16px 32px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "16px"

};

const secondaryButton = {

  background: "#111111",

  border: "1px solid #333",

  color: "white",

  padding: "16px 32px",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "16px"

};
