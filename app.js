async function connectWallet() {
  if (!window.ethereum) {
    alert("Instale MetaMask");
    return;
  }

  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    alert("Carteira conectada com sucesso");
  } catch (err) {
    alert("Conexão recusada");
  }
}
