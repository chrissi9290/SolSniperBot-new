// Raydium API Endpoint (wird später für Preisabfragen benötigt)
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
let initialPrice = null;

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

// Automatisiertes Trading (TP/SL in Prozent)
document.getElementById('startTradingBtn').addEventListener('click', async () => {
    const tpPercent = parseFloat(document.getElementById('tp').value);
    const slPercent = parseFloat(document.getElementById('sl').value);
    
    if (isNaN(tpPercent) || isNaN(slPercent)) {
        logMessage('Bitte gültige TP und SL Werte eingeben.');
        return;
    }

    initialPrice = await fetchCurrentPrice(SOL_MINT, USDC_MINT);
    if (!initialPrice) {
        logMessage('Konnte aktuellen Preis nicht abrufen.');
        return;
    }

    logMessage(`Automatisches Trading gestartet: TP=${tpPercent}%, SL=${slPercent}%`);
    logMessage(`Einstiegspreis: ${initialPrice} SOL`);

    const tpPrice = initialPrice * (1 + tpPercent / 100);
    const slPrice = initialPrice * (1 - slPercent / 100);
    
    tradingInterval = setInterval(async () => {
        const currentPrice = await fetchCurrentPrice(SOL_MINT, USDC_MINT);
        logMessage(`Aktueller Preis: ${currentPrice} SOL`);

        if (currentPrice >= tpPrice) {
            logMessage(`Take Profit erreicht! Verkaufe...`);
            clearInterval(tradingInterval);
        } else if (currentPrice <= slPrice) {
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
    return (Math.random() * (2.5 - 0.5) + 0.5).toFixed(2);
}
