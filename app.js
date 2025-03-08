// Raydium API Endpoint
const RAYDIUM_API = "https://api.raydium.io/v2";
const BIRDEYE_API = "https://public-api.birdeye.so/public";

// Beispiel Token Mints (SOL -> USDC Swap)
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "Es9vMFrzaCER61Z9z5Jx2qb3pJBqumJp2q8wkAJjF7N9";

// HTML-Elemente
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const walletBalanceDisplay = document.getElementById('walletBalance');
const logsDiv = document.getElementById('logs');

let provider = null;
let tradingInterval = null;
let snipingInterval = null;

// Verbindung zum Solana-Netzwerk herstellen
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

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
        await updateWalletBalance(resp.publicKey);
    } catch (err) {
        logMessage('Wallet-Verbindung abgelehnt.');
    }
});

// Wallet-Balance abrufen und anzeigen
async function updateWalletBalance(publicKey) {
    try {
        const balance = await connection.getBalance(publicKey);
        const solBalance = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(4);
        walletBalanceDisplay.textContent = `Balance: ${solBalance} SOL`;
        logMessage(`Aktuelle Wallet-Balance: ${solBalance} SOL`);
    } catch (err) {
        logMessage('Fehler beim Abrufen der Wallet-Balance.');
        console.error(err);
    }
}

// Logs anzeigen
function logMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    logsDiv.innerHTML += `<p>[${timestamp}] ${message}</p>`;
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

// Sniping Funktion starten
document.getElementById('startSnipingBtn').addEventListener('click', () => {
    logMessage('Sniping-Funktion gestartet...');
    snipingInterval = setInterval(async () => {
        const newToken = await fetchNewlyListedToken();
        if (newToken) {
            logMessage(`Neuer Token gefunden: ${newToken.symbol} (${newToken.address})`);
            await buyToken(newToken.address);
        }
    }, 10000); // Alle 10 Sekunden prüfen
});

// Sniping Funktion stoppen
document.getElementById('stopSnipingBtn').addEventListener('click', () => {
    clearInterval(snipingInterval);
    logMessage('Sniping-Funktion gestoppt.');
});

// Abruf neuer Token-Listings von Birdeye API
async function fetchNewlyListedToken() {
    try {
        const response = await fetch(`${BIRDEYE_API}/new_tokens`);
        const data = await response.json();
        if (data && data.length > 0) {
            return data[0]; // Nimm den neuesten gelisteten Token
        }
    } catch (err) {
        logMessage('Fehler beim Abrufen neuer Token-Listings.');
        console.error(err);
    }
    return null;
}

// Simulierter Token-Kauf (hier später Raydium API integrieren)
async function buyToken(tokenAddress) {
    logMessage(`Simulierter Kauf von Token: ${tokenAddress}`);
    // Hier könnte die Kauf-Logik über die Raydium API implementiert werden
}
