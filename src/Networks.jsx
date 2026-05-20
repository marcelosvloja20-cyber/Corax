export default function Networks() {

  const networks = [

    {
      name: "Ethereum",
      symbol: "ETH"
    },

    {
      name: "BNB Chain",
      symbol: "BNB"
    },

    {
      name: "Polygon",
      symbol: "MATIC"
    },

    {
      name: "Arbitrum",
      symbol: "ARB"
    },

    {
      name: "Solana",
      symbol: "SOL"
    }

  ];

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
        Supported Networks
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px"
        }}
      >

        {

          networks.map((network) => (

            <div
              key={network.name}
              style={{
                background: "#050505",
                padding: "18px",
                borderRadius: "14px",
                border: "1px solid #222",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >

              <div>

                <h3
                  style={{
                    marginBottom: "5px"
                  }}
                >
                  {network.name}
                </h3>

                <p
                  style={{
                    color: "#888"
                  }}
                >
                  Multi-chain support enabled
                </p>

              </div>

              <div
                style={{
                  color: "#A855F7",
                  fontWeight: "bold"
                }}
              >
                {network.symbol}
              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}
