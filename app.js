// ================================
// CONFIGURAÇÕES INICIAIS
// ================================
let provider;
let signer;
let userAddress;
const RECEIVER = "SEU_ENDERECO_PUBLICO_AQUI"; // Coloque seu endereço público do smart contract ou carteira

// Elementos do DOM
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const connectWalletBtn = document.getElementById("connectWallet");
const sendPaymentBtn = document.getElementById("sendPayment");
const tokenSelect = document.getElementById("tokenSelect");
const amountInput = document.getElementById("amount");
const progressFill = document.getElementById("progressFill");
const statusEl = document.getElementById("status");
const walletAddressEl = document.getElementById("walletAddress");
const qrcodeEl = document.getElementById("qrcode");
const historyEl = document.getElementById("history");
const toastEl = document.getElementById("toast");

// Histórico local (exemplo simples)
let transactionHistory = [];

// ================================
// SIDEBAR TOGGLE
// ================================
toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// ================================
// CONNECT WALLET
// ================================
async function connectWallet() {
  if (!window.ethereum) {
    showToast("MetaMask não encontrado!");
    return;
  }
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    walletAddressEl.textContent = userAddress;
    showToast("Carteira conectada!");
  } catch (err) {
    console.error(err);
    showToast("Falha ao conectar carteira!");
  }
}
connectWalletBtn.addEventListener("click", connectWallet);

// ================================
// PAGAMENTO
// ================================
async function sendPayment() {
  if (!signer) {
    showToast("Conecte sua carteira primeiro!");
    return;
  }

  const token = tokenSelect.value;
  const amount = amountInput.value;

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    showToast("Digite um valor válido!");
    return;
  }

  try {
    // Animação barra progresso
    progressFill.style.width = "30%";

    let tx;
    if (token === "USDT_ARB" || token === "USDT_POLY" || token === "USDC_BASE") {
      // Simulação de pagamento ERC20 simples
      const erc20Abi = [
        "function transfer(address to, uint amount) public returns (bool)"
      ];
      const tokenAddress = {
        USDT_ARB: "0xUSDT_ARBITRUM_ADDRESS",
        USDT_POLY: "0xUSDT_POLYGON_ADDRESS",
        USDC_BASE: "0xUSDC_BASE_ADDRESS"
      }[token];

      const contract = new ethers.Contract(tokenAddress, erc20Abi, signer);
      const decimals = 6; // USDT / USDC geralmente
      tx = await contract.transfer(RECEIVER, ethers.parseUnits(amount, decimals));
    } else if (token === "NEX") {
      // Aqui será seu token $NEX futuramente
      showToast("Pagamento em $NEX não implementado ainda!");
      progressFill.style.width = "0%";
      return;
    }

    progressFill.style.width = "60%";
    statusEl.textContent = "Transação enviada, aguardando confirmação...";

    await tx.wait();

    progressFill.style.width = "100%";
    statusEl.textContent = "Pagamento confirmado!";
    showToast("Pagamento realizado com sucesso!");

    // Gerar QR Code do link P2P
    qrcodeEl.innerHTML = "";
    new QRCode(qrcodeEl, {
      text: `https://neonex.io/pago?tx=${tx.hash}`,
      width: 120,
      height: 120,
      colorDark: "#ffd700",
      colorLight: "#000"
    });

    // Salvar histórico
    transactionHistory.unshift({
      token,
      amount,
      txHash: tx.hash,
      timestamp: new Date().toLocaleString()
    });
    renderHistory();

    // Reset barra
    setTimeout(() => { progressFill.style.width = "0%"; }, 1500);

  } catch (err) {
    console.error(err);
    showToast("Erro ao enviar pagamento!");
    progressFill.style.width = "0%";
  }
}
sendPaymentBtn.addEventListener("click", sendPayment);

// ================================
// HISTÓRICO
// ================================
function renderHistory() {
  historyEl.innerHTML = "";
  transactionHistory.forEach(tx => {
    const div = document.createElement("div");
    div.className = "history-card";
    div.innerHTML = `
      <b>${tx.token}</b> - ${tx.amount}<br>
      Tx: <a href="https://arbiscan.io/tx/${tx.txHash}" target="_blank">${tx.txHash.slice(0,10)}...</a><br>
      ${tx.timestamp}
    `;
    historyEl.appendChild(div);
  });
}

// ================================
// QUICK ACTIONS
// ================================
function quickSend(){toggleSidebar(); showToast("Abra a sidebar para enviar!");}
function quickReceive(){toggleSidebar(); showToast("Abra a sidebar para receber!");}
function quickSwap(){toggleSidebar(); showToast("Funcionalidade Swap futura");}

// ================================
// TOAST
// ================================
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => { toastEl.classList.remove("show"); }, 2500);
}

// ================================
// FUNÇÃO TOGGLE SIDEBAR SIMPLES
// ================================
function toggleSidebar(){sidebar.classList.add("active");}

  