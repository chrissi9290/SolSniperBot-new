// API Endpoints
const BIRDEYE_API = "https://public-api.birdeye.so/public";
const SOLSCAN_API = "https://api.solscan.io/token/meta?tokenAddress=";

// HTML-Elemente für Sicherheitsoptionen
const honeypotCheckToggle = document.getElementById('honeypotCheck');
const liquidityCheckToggle = document.getElementById('liquidityCheck');
const checkFreezableToggle = document.getElementById('checkFreezable');
const checkMintableToggle = document.getElementById('checkMintable');
const checkImmutableToggle = document.getElementById('checkImmutable');

// Wallet-Verbindung herstellen (DEBUG-Version)
connectWalletBtn.addEventListener('click', async () => {
    logMessage('Versuche, die Wallet zu verbinden...');
    
    provider = window.phantom?.solana;
    if (!provider?.isPhantom) {
        logMessage('Phantom Wallet nicht gefunden!', true);
        return;
    }

    try {
        const resp = await provider.connect();
        if (!resp.publicKey) {
            logMessage('Wallet verbunden, aber kein Public Key erhalten.', true);
            return;
        }

        publicKey = resp.publicKey;
        walletAddressDisplay.textContent = `Verbunden: ${publicKey.toString()}`;
        logMessage(`Wallet erfolgreich verbunden: ${publicKey.toString()}`);
    } catch (err) {
        logMessage(`Fehler bei der Wallet-Verbindung: ${err.message}`, true);
        console.error('Wallet-Verbindungsfehler:', err);
    }
});

// Logs anzeigen
function logMessage(message, isError = false) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    if (isError) logEntry.classList.add('log-error');
    logsDiv.appendChild(logEntry);
}

// Sniping Funktion starten
document.getElementById('startSnipingBtn').addEventListener('click', async () => {
    logMessage('Sniping-Funktion gestartet...');
});

// Sniping Funktion stoppen
document.getElementById('stopSnipingBtn').addEventListener('click', () => {
    logMessage('Sniping-Funktion gestoppt.');
});
