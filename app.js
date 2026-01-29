let provider, signer, walletAddress;

async function connectWallet() {

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

  } else {
    const wcProvider = new WalletConnectProvider.default({
      rpc: {
        1: "https://rpc.ankr.com/eth",
        42161: "https://rpc.ankr.com/arbitrum",
        137: "https://rpc.ankr.com/polygon"
      }
    });

    await wcProvider.enable();
    provider = new ethers.BrowserProvider(wcProvider);
  }

  signer = await provider.getSigner();
  walletAddress = await signer.getAddress();

  document.getElementById("walletAddress").innerText = walletAddress;
  showToast("Carteira conectada com sucesso!");
}

// Envio nativo (ETH / MATIC / ARB etc)
async function sendNative(to, amount) {
  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amount)
  });

  progress(40);
  await tx.wait();
  progress(100);

  updateHistory(`Pagamento enviado → ${amount}`);
  showToast("Pagamento confirmado!");
}

// Quick buttons
function quickSend() {
  const to = prompt("Endereço destino:");
  const amount = prompt("Valor:");
  sendNative(to, amount);
}

function quickReceive() {
  generateQR(walletAddress);
  showToast("QR gerado para receber");
}

function quickSwap() {
  showToast("Swap interno em breve");
}

// Progress bar
function progress(val){
  document.getElementById("progressFill").style.width = val + "%";
}

// QR Code
function generateQR(address){
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), address);
}

// Toast
function showToast(msg){
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),3000);
}

// Histórico
function updateHistory(msg){
  const h = document.getElementById("history");
  const d = document.createElement("div");
  d.className = "history-card";
  d.innerText = msg;
  h.prepend(d);
}

// Botões
document.getElementById("connectWallet").onclick = connectWallet;

document.getElementById("sendPayment").onclick = () => {
  const to = prompt("Endereço destino:");
  const amount = document.getElementById("amount").value;
  sendNative(to, amount);
};

// Sidebar toggle
document.getElementById("toggleSidebar").onclick = () => {
  document.getElementById("sidebar").classList.toggle("active");
};

  