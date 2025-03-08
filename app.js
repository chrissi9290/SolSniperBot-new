// Wallet-Verbindung herstellen
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const logsDiv = document.getElementById('logs');

let provider = null;

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
