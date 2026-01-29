let provider;
let signer;
let userAddress;

const USDT_POLYGON = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

const erc20ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

/* ===== CONECTAR ===== */

document.getElementById("connectBtn").onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask não encontrada");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  userAddress = await signer.getAddress();

  const balance = await provider.getBalance(userAddress);
  const network = await provider.getNetwork();

  document.getElementById("address").innerText = userAddress;
  document.getElementById("balance").innerText = ethers.formatEther(balance) + " ETH";
  document.getElementById("network").innerText = network.name;

  document.getElementById("walletBox").style.display = "block";
};

/* ===== ENVIAR ETH ===== */

document.getElementById("sendETH").onclick = async () => {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  if (!ethers.isAddress(to)) return alert("Endereço inválido");

  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amount)
  });

  alert("TX enviada:\nhttps://etherscan.io/tx/" + tx.hash);
};

/* ===== ENVIAR USDT ===== */

document.getElementById("sendUSDT").onclick = async () => {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  if (!ethers.isAddress(to)) return alert("Endereço inválido");

  const network = await provider.getNetwork();
  if (network.chainId !== 137n) return alert("Conecte na rede Polygon");

  const token = new ethers.Contract(USDT_POLYGON, erc20ABI, signer);
  const decimals = await token.decimals();
  const value = ethers.parseUnits(amount, decimals);

  const tx = await token.transfer(to, value);

  alert("USDT enviado:\nhttps://polygonscan.com/tx/" + tx.hash);
};

/* ===== GERAR QR ===== */

document.getElementById("qrBtn").onclick = async () => {
  if (!userAddress) return alert("Conecte a carteira");

  const amount = document.getElementById("qrAmount").value;
  const network = await provider.getNetwork();
  const chainId = network.chainId.toString();

  const valuePart = amount ? `?value=${ethers.parseEther(amount)}` : "";
  const qrUrl = `ethereum:${userAddress}@${chainId}${valuePart}`;

  const box = document.getElementById("qrcode");
  box.replaceChildren();

  new QRCode(box, {
    text: qrUrl,
    width: 220,
    height: 220
  });
};

  