let provider;
let signer;
let userAddress;

const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("sendPayment");
const amountInput = document.getElementById("amount");
const statusBox = document.getElementById("status");
const progressBar = document.getElementById("progressFill");

connectBtn.onclick = connectWallet;
sendBtn.onclick = sendPayment;

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask não encontrada");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();

  statusBox.innerText = "Carteira conectada com sucesso ✅";
}

async function sendPayment() {
  if (!signer) {
    alert("Conecte a carteira primeiro");
    return;
  }

  const amount = amountInput.value;
  startProgress("Enviando transação...");

  const tx = await signer.sendTransaction({
    to: userAddress, // depois troque pelo recebedor real
    value: ethers.parseEther(amount)
  });

  startProgress("Aguardando confirmação na blockchain...");

  const receipt = await provider.waitForTransaction(tx.hash);

  if (receipt.status === 1) {
    finishProgress("Pagamento confirmado com sucesso 🎉");
  } else {
    finishProgress("Transação falhou ❌");
  }
}

function startProgress(message) {
  statusBox.innerText = message;
  progressBar.style.width = "30%";

  setTimeout(() => {
    progressBar.style.width = "65%";
  }, 1200);
}

function finishProgress(message) {
  progressBar.style.width = "100%";
  statusBox.innerText = message;

  setTimeout(() => {
    progressBar.style.width = "0%";
  }, 2000);
}

  