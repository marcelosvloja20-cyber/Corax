import { useState } from "react";

export default function Swap() {

  const [fromToken, setFromToken] = useState("ETH");

  const [toToken, setToToken] = useState("CRX");

  const [amount, setAmount] = useState("");

  const [result, setResult] = useState("");

  // =====================================
  // SWAP
  // =====================================

  const handleSwap = () => {

    if (!amount) return;

    const converted =
      Number(amount) * 125;

    setResult(

      `${amount} ${fromToken} → ${converted} ${toToken}`

    );

  };

  return (

    <div
      style={{
        marginTop: "30px"
      }}
    >

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        CORΛX Swap
      </h2>

      <div
        style={{
          background: "#050505",
          padding: "25px",
          borderRadius: "18px",
          border: "1px solid #222"
        }}
      >

        <p
          style={{
            color: "#888",
            marginBottom: "20px"
          }}
        >
          Swap assets across multiple chains.
        </p>

        <select
          value={fromToken}
          onChange={(e) =>
            setFromToken(e.target.value)
          }
          style={selectStyle}
        >
          <option>ETH</option>
          <option>BNB</option>
          <option>MATIC</option>
          <option>SOL</option>
        </select>

        <select
          value={toToken}
          onChange={(e) =>
            setToToken(e.target.value)
          }
          style={selectStyle}
        >
          <option>CRX</option>
          <option>ETH</option>
          <option>BNB</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={handleSwap}
          style={buttonStyle}
        >
          Execute Swap
        </button>

        {

          result && (

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "12px",
                background: "#111111",
                border: "1px solid #222",
                color: "#22C55E",
                fontWeight: "bold"
              }}
            >
              {result}
            </div>

          )

        }

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const selectStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  borderRadius: "12px",

  border: "1px solid #333",

  background: "#111111",

  color: "white"

};

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  borderRadius: "12px",

  border: "1px solid #333",

  background: "#111111",

  color: "white"

};

const buttonStyle = {

  width: "100%",

  padding: "14px",

  background: "#A855F7",

  border: "none",

  borderRadius: "12px",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"

};
