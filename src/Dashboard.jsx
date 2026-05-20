export default function Dashboard() {

  const token =
    localStorage.getItem("token");

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
          fontSize: "48px",
          marginBottom: "10px"
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
          maxWidth: "500px"
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
          JWT Token detected.
        </p>

        <div
          style={{
            background: "#050505",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #222",
            wordBreak: "break-all",
            color: "#888"
          }}
        >
          {token}
        </div>

      </div>

    </div>

  );

}
