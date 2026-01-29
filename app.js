// Elementos do DOM
const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("sendPayment");
const statusText = document.getElementById("status");
const amountInput = document.getElementById("amount");
const progressFill = document.getElementById("progressFill");
const toast = document.getElementById("toast");
const qrBox = document.getElementById("qrcode");
const walletBox = document.getElementById("walletAddress");
const historyBox = document.getElementById("history");
const productNameBox = document.getElementById("productName");
const tokenSelect = document.getElementById("tokenSelect");

let provider, signer, userAddress = null;

// Tokens multi-chain
const TOKENS = {
  USDT_ARB: { address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", network: 42161 },
  USDT_POLY: { address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803", network: 137 },
  USDC_BASE: { address: "0x0c12b7D63d2f87662e5E2E93E502eF32fC073c47", network: 8453 }
};

// Endereço do recebedor
const RECEIVER = "SEU_ENDERECO_PUBLICO_AQUI";

// Função de toast
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Salvar transações localmente
function saveTransaction(data) {
  const history = JSON.parse(localStorage.getItem("neonex_history")) || [];
  history.unshift(data);
  localStorage.setItem("neonex_history", JSON.stringify(history));
}

// Carregar histórico
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("neonex_history")) || [];
  historyBox.innerHTML = "";
  history.forEach(tx => {
    const div = document.createElement("div");
    div.className = "history-card";
    div.innerHTML = `<strong>${tx.amount}</strong> - ${tx.product}<br>${tx.date}<br><small>${tx.hash}</small>`;
    historyBox.appendChild(div);
  });
}

// Conectar MetaMask
async function connectWallet() {
  if (!window.ethereum) { alert("MetaMask não encontrada"); return; }
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();
  walletBox.innerText = "Endereço: " + userAddress;
  showToast("Carteira conectada ✅");
  generateQR();
}

connectBtn.onclick = connectWallet;

// Gerar QR dinâmico
function generateQR() {
  if (!userAddress) return;
  qrBox.innerHTML = "";
  const tokenKey = tokenSelect.value;
  const token = TOKENS[tokenKey];
  const amount = amountInput.value || 0;
  const qrData = `ethereum:${RECEIVER}@${token.network}/transfer?address=${token.address}&uint256=${amount}`;
  new QRCode(qrBox, { text: qrData, width: 180, height: 180, colorDark: "#ffd700", colorLight: "#000" });
}

amountInput.addEventListener("input", generateQR);
tokenSelect.addEventListener("change", generateQR);

// Criar link de pagamento (fictício, pode integrar API real depois)
async function createPaymentLink(amount, product) {
  try {
    const res = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, product })
    });
    const data = await res.json();
    if (data.link) {
      showToast("Link criado ✅");
      window.history.replaceState({}, "", data.link);
    }
  } catch (err) {
    console.error(err);
    showToast("Erro ao criar link ❌");
  }
}

// Enviar pagamento
async function sendPayment() {
  if (!signer) { showToast("Conecte a carteira"); return; }
  const value = amountInput.value;
  const product = productNameBox.innerText;
  if (!value || value <= 0) { showToast("Valor inválido"); return; }

  try {
    const tokenKey = tokenSelect.value;
    const token = TOKENS[tokenKey];

    progressFill.style.width = "30%";
    statusText.innerText = "Criando pagamento...";
    showToast("Iniciando pagamento...");

    await createPaymentLink(value, product);

    progressFill.style.width = "50%";
    statusText.innerText = "Enviando pagamento...";

    const contract = new ethers.Contract(token.address, [
      "function transfer(address to, uint amount) returns (bool)",
      "function decimals() view returns (uint8)"
    ], signer);

    const decimals = await contract.decimals();
    const amountParsed = ethers.parseUnits(value, decimals);
    const tx = await contract.transfer(RECEIVER, amountParsed);

    progressFill.style.width = "70%";
    statusText.innerText = "Confirmando...";
    await tx.wait();

    progressFill.style.width = "100%";
    statusText.innerText = "Pagamento confirmado 🎉";
    showToast("Pagamento recebido ✅");

    saveTransaction({ amount: value, product, date: new Date().toLocaleString(), hash: tx.hash });
    loadHistory();
    generateQR();
  } catch (err) {
    console.error(err);
    showToast("Erro na transação ❌");
    progressFill.style.width="0%";
  }
}

sendBtn.onclick = sendPayment;

// Inicializar
loadHistory();
generateQR();


  