
import { ethers } from "ethers";

/* ===== CONECTAR CARTEIRA ===== */

const connectBtn = document.getElementById("connectBtn");
const sendBtn = document.getElementById("sendBtn");
const qrBtn = document.getElementById("qrBtn");

const addressSpan = document.getElementById("address");
const balanceSpan = document.getElementById("balance");
const networkSpan = document.getElementById("network");
const walletInfo = document.getElementById("walletInfo");
const qrBox = document.getElementById("qrBox");

let provider;
let signer;
let userAddress;

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask não encontrada");
    return;
  }

  try {
    connectBtn.innerText = "Conectando...";

    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();

    userAddress = await signer.getAddress();
    const balance = await provider.getBalance(userAddress);
    const network = await provider.getNetwork();

    addressSpan.innerText = userAddress;
    balanceSpan.innerText = ethers.formatEther(balance) + " ETH";
    networkSpan.innerText = network.name;

    walletInfo.classList.remove("hidden");
    qrBox.classList.remove("hidden");

    connectBtn.innerText = "Carteira Conectada ✅";

  } catch (err) {
    console.error(err);
    alert("Erro ao conectar carteira");
    connectBtn.innerText = "Conectar Carteira";
  }
};

/* ===== ENVIAR PAGAMENTO ===== */

sendBtn.onclick = async () => {
  if (!provider || !signer) {
    alert("Conecte a carteira primeiro");
    return;
  }

  const to = document.getElementById("to").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!to || !amount) {
    alert("Preencha endereço e valor");
    return;
  }

  if (!ethers.isAddress(to)) {
    alert("Endereço inválido");
    return;
  }

  const network = await provider.getNetwork();
  if (network.chainId !== 1n) {
    alert("Conecte na rede Ethereum Mainnet");
    return;
  }

  try {
    sendBtn.innerText = "Enviando...";

    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.parseEther(amount)
    });

    alert(`Transação enviada!
https://etherscan.io/tx/${tx.hash}`);

    sendBtn.innerText = "Enviar ETH";

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar pagamento");
    sendBtn.innerText = "Enviar ETH";
  }
};

/* ===== GERAR QR CODE PRO MULTICHAIN ===== */

qrBtn.onclick = async () => {
  if (!userAddress) {
    alert("Conecte a carteira primeiro");
    return;
  }

  const amount = document.getElementById("qrAmount").value.trim();
  const network = await provider.getNetwork();

  const chainId = network.chainId.toString();

  const valuePart = amount ? `?value=${ethers.parseEther(amount)}` : "";

  const qrUrl = `ethereum:${userAddress}@${chainId}${valuePart}`;

  const qrContainer = document.getElementById("qrcode");
  qrContainer.replaceChildren();

  new QRCode(qrContainer, {
    text: qrUrl,
    width: 220,
    height: 220
  });
};
/* ===== PAGAMENTO VIA LINK (ESTILO PIX WEB3) ===== */

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    to: params.get("to"),
    amount: params.get("amount")
  };
}

window.addEventListener("load", async () => {
  const { to, amount } = getQueryParams();

  if (!to) return;

  if (!ethers.isAddress(to)) {
    alert("Link inválido");
    return;
  }

  document.getElementById("to").value = to;

  if (amount) {
    document.getElementById("amount").value = amount;
    document.getElementById("qrAmount").value = amount;
  }

  if (userAddress) return;

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
  }

  const network = await provider.getNetwork();
  const chainId = network.chainId.toString();

  const valuePart = amount ? `?value=${ethers.parseEther(amount)}` : "";
  const qrUrl = `ethereum:${to}@${chainId}${valuePart}`;

  const qrContainer = document.getElementById("qrcode");
  qrContainer.replaceChildren();

  new QRCode(qrContainer, {
    text: qrUrl,
    width: 220,
    height: 220
  });
});
/* ===== PAGAMENTO STABLECOIN (USDT / USDC) ===== */

const erc20ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// escolha qual stable quer usar
const STABLE_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT Polygon
// const STABLE_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC Polygon

async function sendStable(to, amount) {
  if (!ethers.isAddress(to)) {
    alert("Endereço inválido");
    return;
  }

  const network = await provider.getNetwork();

  if (network.chainId !== 137n) {
    alert("Conecte na rede Polygon");
    return;
  }

  const token = new ethers.Contract(
    STABLE_ADDRESS,
    erc20ABI,
    signer
  );

  const decimals = await token.decimals();
  const value = ethers.parseUnits(amount, decimals);

  try {
    const tx = await token.transfer(to, value);

    alert(`Pagamento enviado!
https://polygonscan.com/tx/${tx.hash}`);

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar stablecoin");
  }
}