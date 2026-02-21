import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

// Conexão com Supabase (Pegue as chaves no painel do Supabase)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST' });

    let { to, amount, action, username, wallet } = req.body;

    // --- LÓGICA DE REGISTRO DE NOVO @USUÁRIO ---
    if (action === 'register') {
        const { error } = await supabase.from('registros').insert([{ username: username.toLowerCase(), wallet_address: wallet }]);
        if (error) return res.status(400).json({ error: 'Nome já ocupado ou erro no banco.' });
        return res.status(200).json({ success: true, message: 'Nome registrado!' });
    }

    // --- LÓGICA DE TRANSFERÊNCIA P2P ---
    if (to.startsWith('@')) {
        const { data } = await supabase.from('registros').select('wallet_address').eq('username', to.toLowerCase()).single();
        if (!data) return res.status(404).json({ error: 'Usuário NEONEX não encontrado.' });
        to = data.wallet_address;
    }

    try {
        const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
        const masterWallet = new ethers.Wallet(process.env.NEONEX_PRIVATE_KEY, provider);

        const tx = await masterWallet.sendTransaction({
            to: to,
            value: ethers.parseEther(amount.toString())
        });
        await tx.wait();

        return res.status(200).json({ success: true, hash: tx.hash });
    } catch (err) {
        return res.status(500).json({ error: 'Erro na rede ou saldo insuficiente na reserva.' });
    }
}
