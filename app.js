// Raydium API Endpoint
const RAYDIUM_API = "https://api.raydium.io/v2";

// Beispiel Token Mints (SOL -> USDC Swap)
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "Es9vMFrzaCER61Z9z5Jx2qb3pJBqumJp2q8wkAJjF7N9";

// HTML-Elemente
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const logsDiv = document.getElementById('logs');

let provider = null;
let tradingInterval = null;

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

// Automatisiertes Trading (TP/SL)
document.getElementById('startTradingBtn').addEventListener('click', () => {
    const tp = parseFloat(document.getElementById('tp').value);
    const sl = parseFloat(document.getElementById('sl').value);
    if (isNaN(tp) || isNaN(sl)) {
        logMessage('Bitte gültige TP und SL Werte eingeben.');
        return;
    }

    logMessage(`Automatisches Trading gestartet: TP=${tp} SOL, SL=${sl} SOL`);
    
    tradingInterval = setInterval(async () => {
        const currentPrice = await fetchCurrentPrice(SOL_MINT, USDC_MINT);
        logMessage(`Aktueller Preis: ${currentPrice} SOL`);

        if (currentPrice >= tp) {
            logMessage(`Take Profit erreicht! Verkaufe...`);
            clearInterval(tradingInterval);
        } else if (currentPrice <= sl) {
            logMessage(`Stop Loss erreicht! Verkaufe...`);
            clearInterval(tradingInterval);
        }
    }, 5000); // Preis alle 5 Sekunden prüfen
});

document.getElementById('stopTradingBtn').addEventListener('click', () => {
    clearInterval(tradingInterval);
    logMessage('Automatisches Trading gestoppt.');
});

// Simulierter Preisabruf (Hier sollte später die API-Abfrage hin)
async function fetchCurrentPrice(inputMint, outputMint) {
    // Simulierter Preis (Zufallswert zur Demonstration)
    return (Math.random() * (2.5 - 0.5) + 0.5).toFixed(2);
}
