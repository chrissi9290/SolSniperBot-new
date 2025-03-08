// Raydium API Endpoint
const RAYDIUM_API = "https://api.raydium.io/v2";

// Beispiel Token Mints (SOL -> USDC Swap)
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "Es9vMFrzaCER61Z9z5Jx2qb3pJBqumJp2q8wkAJjF7N9";

// HTML-Elemente
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const logsDiv = document.getElementById('logs');

// Wallet Provider
let provider = null;

// Wallet-Verbindung herstellen
connectWalletBtn.addEventListener('click', async () => {
    provider = window.phantom?.solana;
    if (!provider?.isPhantom) {
        logMessage('Phantom Wallet nicht gefunden!');
        return;
    }
    try {
        const resp = await provider.connect();
        walletAddressDisplay.textContent = `Verbunden: ${resp.publicKey.toString()}`;
        logMessage(`Wallet verbunden: ${resp.publicKey.toString()}`);
    } catch (err) {
        logMessage('Wallet-Verbindung abgelehnt.');
    }
});

// Logs anzeigen
function logMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    logsDiv.innerHTML += `<p>[${timestamp}] ${message}</p>`;
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

// Automatisiertes Trading starten
document.getElementById('startTradingBtn').addEventListener('click', () => {
    const tp = document.getElementById('tp').value;
    const sl = document.getElementById('sl').value;
    logMessage(`Trading gestartet: TP=${tp}, SL=${sl}`);
});

// Sniping Funktion
document.getElementById('startSnipingBtn').addEventListener('click', () => {
    logMessage('Sniping-Funktion aktiviert!');
});

// Kaufen-Button Funktion
document.getElementById('buyTokenBtn').addEventListener('click', async () => {
    const amount = document.getElementById('buyAmount').value;
    if (!amount || !provider) {
        logMessage('Bitte Wallet verbinden und Menge eingeben.');
        return;
    }
    logMessage(`Starte Kauf von ${amount} SOL...`);
    
    try {
        const quoteUrl = `${RAYDIUM_API}/compute/swap-base-in?inputMint=${SOL_MINT}&outputMint=${USDC_MINT}&amount=${amount * 1e9}&slippageBps=100&txVersion=V0`;
        const res = await fetch(quoteUrl);
        const { data: swapResponse } = await res.json();
        
        const txUrl = `${RAYDIUM_API}/transaction/swap-base-in`;
        const txRes = await fetch(txUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                swapResponse,
                txVersion: 'V0',
                wallet: provider.publicKey.toString(),
                wrapSol: false,
                unwrapSol: false
            })
        });
        
        const txData = await txRes.json();
        const transactionBase64 = txData.data[0].transaction;
        
        const transaction = solanaWeb3.Transaction.from(Buffer.from(transactionBase64, 'base64'));
        const { signature } = await provider.signAndSendTransaction(transaction);
        
        logMessage(`Token-Kauf abgeschlossen. TX: ${signature}`);
    } catch (err) {
        logMessage('Fehler beim Kauf: ' + err.message);
        console.error(err);
    }
});
