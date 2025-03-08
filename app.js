// API Endpoints
const RAYDIUM_API = "https://api.raydium.io/v2";
const BIRDEYE_API = "https://public-api.birdeye.so/public";

// Solana Verbindung (Devnet für Test)
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// HTML-Elemente
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const walletBalanceDisplay = document.getElementById('walletBalance');
const logsDiv = document.getElementById('logs');

let provider = null;
let publicKey = null;
let balanceInterval = null;
let tradingInterval = null;
let snipingInterval = null;

// Wallet-Verbindung herstellen
connectWalletBtn.addEventListener('click', async () => {
    provider = window.phantom?.solana;
    if (!provider?.isPhantom) {
        logMessage('Phantom Wallet nicht gefunden!', true);
        return;
    }

    try {
        const resp = await provider.connect();
        publicKey = resp.publicKey;

        if (!publicKey) {
            logMessage('Kein Public Key von der Wallet erhalten.', true);
            return;
        }

        walletAddressDisplay.textContent = `Verbunden: ${publicKey.toString()}`;
        logMessage(`Wallet verbunden: ${publicKey.toString()}`);
        await updateWalletBalance();

        if (balanceInterval) clearInterval(balanceInterval);
        balanceInterval = setInterval(updateWalletBalance, 30000);
    } catch (err) {
        logMessage(`Fehler bei Wallet-Verbindung: ${err.message}`, true);
    }
});

// Wallet-Balance abrufen
async function updateWalletBalance() {
    try {
        const balance = await connection.getBalance(publicKey);
        const solBalance = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(4);
        walletBalanceDisplay.textContent = `Balance: ${solBalance} SOL`;
        logMessage(`Aktuelle Wallet-Balance: ${solBalance} SOL`);
    } catch (err) {
        logMessage(`Fehler beim Abrufen der Wallet-Balance: ${err.message}`, true);
    }
}

// Logs anzeigen
function logMessage(message, isError = false) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    if (isError) logEntry.classList.add('log-error');
    logsDiv.appendChild(logEntry);
}

// Sniping Funktion starten
document.getElementById('startSnipingBtn').addEventListener('click', () => {
    logMessage('Sniping-Funktion gestartet...');
});

// Sniping Funktion stoppen
document.getElementById('stopSnipingBtn').addEventListener('click', () => {
    logMessage('Sniping-Funktion gestoppt.');
});
