import { useState } from "react";

export default function Staking() {

  const [amount, setAmount] = useState("");

  const [staked, setStaked] = useState(0);

  // =====================================
  // STAKE
  // =====================================

  const handleStake = () => {

    if (!amount) return;

    setStaked(

      Number(staked) + Number(amount)

    );

    setAmount("");

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
        CORΛX Staking
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
          Stake CRX and earn rewards.
        </p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#111111",
            color: "white",
            marginBottom: "15px"
          }}
        />

        <button
          onClick={handleStake}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: "#A855F7",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Stake CRX
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#111111",
            borderRadius: "12px",
            border: "1px solid #222"
          }}
        >

          <h3
            style={{
              marginBottom: "10px"
            }}
          >
            Total Staked
          </h3>

          <p
            style={{
              color: "#22C55E",
              fontSize: "24px",
              fontWeight: "bold"
            }}
          >
            {staked} CRX
          </p>

        </div>

      </div>

    </div>

  );

}
