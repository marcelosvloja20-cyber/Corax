const connectBtn = document.getElementById("connectWallet");
const sendBtn = document.getElementById("sendPayment");
const statusText = document.getElementById("status");
const amountInput = document.getElementById("amount");
const progressFill = document.getElementById("progressFill");

let provider;
let signer;

const USDT_ADDRESS = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";

const USDT_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// 🔐 Seu endereço de recebimento
const RECEIVER="0xd8deaef57da7b8804fecfbfbaeb31ccd335749f5";

function saveTransaction(data) {
  const history = JSON.parse(localStorage.getItem("neonex_history")) || [];
  history.unshift(data);
  localStorage.setItem("neonex_history", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("neonex_history")) || [];
  const list = document.getElementById("history");

  if (!list) return;

  list.innerHTML = "";

  history.forEach(tx => {
    const item = document.createElement("div");
    item.style.marginTop = "10px";
    item.innerHTML = `
      <strong>${tx.amount} USDT</strong><br>
      ${tx.date}<br>
      <small>${tx.hash}</small>
      <hr>
    `;
    list.appendChild(item);
  });
}

async function connectWallet() {
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  statusText.innerText = "Carteira conectada ✅";
}

connectBtn.onclick = connectWallet;

function loadAmountFromURL() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("amount");

  