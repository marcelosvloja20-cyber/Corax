let provider;
let signer;
let userAddress;

const statusBox = document.getElementById("status");
const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("sendPayment");
const amountInput = document.getElementById("amount");

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

  statusBox.innerText = "Carteira conectada: " + userAddress;
}

async function sendPayment() {
  if (!signer) {
    alert("Conecte a carteira primeiro");
    return;
  }

  const amount = amountInput.value;

  const tx = await signer.sendTransaction({
    to: userAddress, // depois você troca pelo endereço do recebedor
    value: ethers.parseEther(amount)
  });

  statusBox.innerText = "Transação enviada... aguardando confirmação ⏳";

  await waitForConfirmation(tx.hash);
}

async function waitForConfirmation(hash) {
  const receipt = await provider.waitForTransaction(hash);

  if (receipt.status === 1) {
    statusBox.innerText = "Pagamento confirmado na blockchain ✅";
  } else {
    statusBox.innerText = "Falha na transação ❌";
  }
}

  