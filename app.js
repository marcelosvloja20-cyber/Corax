// Endereço público para receber pagamentos
const RECEIVER = "SEU_ENDERECO_PUBLICO_AQUI"; // substitua pelo seu endereço real

// Variáveis globais
let provider, signer, walletAddress;
let history = [];

// Elementos
const connectWalletBtn = document.getElementById('connectWallet');
const sendPaymentBtn = document.getElementById('sendPayment');
const tokenSelect = document.getElementById('tokenSelect');
const amountInput = document.getElementById('amount');
const progressFill = document.getElementById('progressFill');
const statusEl = document.getElementById('status');
const walletAddressEl = document.getElementById('walletAddress');
const qrcodeContainer = document.getElementById('qrcode');
const toast = document.getElementById('toast');

// Gráfico
let paymentChart;
const ctx = document.getElementById('paymentChart').getContext('2d');

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
document.getElementById('toggleSidebar').onclick = () => {
  sidebar.classList.toggle('active');
};

// Função para mostrar Toast
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(()=>{ toast.classList.remove('show'); },3000);
}

// Conectar carteira
connectWalletBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      walletAddress = await signer.getAddress();
      walletAddressEl.innerText = walletAddress;
      showToast("Carteira conectada!");
    } catch(err) {
      console.error(err);
      showToast("Erro ao conectar carteira.");
    }
  } else {
    alert("Instale MetaMask ou carteira compatível.");
  }
};

// Enviar pagamento
sendPaymentBtn.onclick = async () => {
  const amount = amountInput.value;
  const token = tokenSelect.value;

  if (!walletAddress) { showToast("Conecte sua carteira."); return; }
  if (!amount || isNaN(amount) || amount <= 0) { showToast("Valor inválido."); return; }

  progressFill.style.width = "30%";
  statusEl.innerText = "Preparando pagamento...";

  try {
    // Para simplificação, apenas QR + histórico, real tx depende do smart contract
    const paymentInfo = `${token}:${RECEIVER}?value=${amount}`;
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, { text: paymentInfo, width:200, height:200 });

    // Atualiza histórico
    const tx = { token, amount, date: new Date().toLocaleString() };
    history.unshift(tx);
    renderHistory();
    renderChart();

    progressFill.style.width = "100%";
    statusEl.innerText = "Pagamento pronto via QR!";
    showToast("Pagamento gerado!");
  } catch(err){
    console.error(err);
    showToast("Erro ao gerar pagamento.");
    progressFill.style.width = "0%";
    statusEl.innerText = "";
  }
};

// Renderizar extrato
function renderHistory(){
  const historyEl = document.getElementById('history');
  historyEl.innerHTML = "";
  history.forEach(tx=>{
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `<strong>${tx.token}</strong> → ${tx.amount} <br><small>${tx.date}</small>`;
    historyEl.appendChild(card);
  });
}

// Gráfico de pagamentos
function renderChart(){
  const labels = history.map(tx=>tx.date).slice(0,10).reverse();
  const data = history.map(tx=>parseFloat(tx.amount)).slice(0,10).reverse();

  if(paymentChart) paymentChart.destroy();
  paymentChart = new Chart(ctx,{
    type:'bar',
    data:{
      labels,
      datasets:[{
        label:'Pagamentos Recentes',
        data,
        backgroundColor:'#ffd700'
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{ display:false },
        tooltip:{ mode:'index', intersect:false }
      },
      scales:{
        x:{ ticks:{color:'#fff'}, grid:{color:'#222'} },
        y:{ ticks:{color:'#fff'}, grid:{color:'#222'} }
      }
    }
  });
}

// Planos Premium
function subscribePlan(name, price){
  showToast(`Você assinou o Plano ${name} por $${price}!`);
  // Aqui pode integrar API real para assinatura / smart contract
}


  