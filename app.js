
window.onload = () => {

  // 🔗 Parâmetros da URL (QR / link de pagamento)
  const params = new URLSearchParams(window.location.search);
  const toParam = params.get("to");
  const amountParam = params.get("amount");

  if (toParam) document.getElementById("to").value = toParam;
  if (amountParam) document.getElementById("amount").value = amountParam;

  // 📦 Elementos principais
  const connectBtn = document.getElementById("connectBtn");
  const walletInfo = document.getElementById("walletInfo");

  const addressSpan = document.getElementById("address");
  const balanceSpan = document.getElementById("balance");
  const networkSpan = document.getElementById("network");

  // 🔐 Conectar carteira
  connectBtn.onclick = async () => {
    if (!window.ethereum) {
      alert(
        "Abra este site dentro do browser da MetaMask.\n\n" +
        "MetaMask → Browser → Cole o link"
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      addressSpan.innerText = address;
      balanceSpan.innerText = ethers.formatEther(balance) + " ETH";
      networkSpan.innerText = network.name;

      walletInfo.classList.remove("hidden");
      document.getElementById("sendBox").classList.remove("hidden");
      document.getElementById("qrBox").classList.remove("hidden");

      connectBtn.innerText = "Carteira Conectada ✅";

    } catch (err) {
      console.error(err);
      alert("Erro ao conectar carteira");
    }
  };

  // 💸 Enviar pagamento (ETH)
  document.getElementById("sendBtn").onclick = async () => {
    if (!window.ethereum) {
      alert("MetaMask não encontrada");
      return;
    }

    const to = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;

    if (!to || !amount) {
      alert("Preencha endereço e valor");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: to,
        value: ethers.parseEther(amount)
      });

      alert("Transação enviada 🚀\nHash:\n" + tx.hash);

    } catch (err) {
      console.error(err);
      alert("Erro ao enviar pagamento");
    }
  };

};
  
