// Verbindung zum Solana-Netzwerk herstellen (Devnet zum Testen)
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// HTML-Elemente
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const walletBalanceDisplay = document.getElementById('walletBalance');
const logsDiv = document.getElementById('logs');

let provider = null;
let publicKey = null;
let balanceInterval = null;

// Wallet-Verbindung herstellen
connectWalletBtn.addEventListener('click', async () => {
    provider = window.phantom?.solana;
    if (!provider?.isPhantom) {
        logMessage('Phantom Wallet nicht gefunden!');
        return;
    }

    try {
        const resp = await provider.connect();
        publicKey = resp.publicKey;

        if (!publicKey) {
            logMessage('Kein Public Key von der Wallet erhalten.');
            return;
        }

        walletAddressDisplay.textContent = `Verbunden: ${publicKey.toString()}`;
        logMessage(`Wallet verbunden: ${publicKey.toString()}`);
        await updateWalletBalance();

        // Automatische Aktualisierung der Balance alle 30 Sekunden
        if (balanceInterval) clearInterval(balanceInterval);
        balanceInterval = setInterval(updateWalletBalance, 30000);
    } catch (err) {
        logMessage(`Fehler bei Wallet-Verbindung: ${err.message}`);
        console.error(err);
    }
});

// Wallet-Balance abrufen und anzeigen
async function updateWalletBalance() {
    if (!publicKey) {
        logMessage('Kein Wallet verbunden. Kann Balance nicht abrufen.');
        return;
    }
    try {
        logMessage('Frage Wallet-Balance ab...');
        const balance = await connection.getBalance(publicKey);

        if (balance === null) {
            logMessage('Balance konnte nicht abgerufen werden (null zurückgegeben).');
            return;
        }

        const solBalance = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(4);
        walletBalanceDisplay.textContent = `Balance: ${solBalance} SOL`;
        logMessage(`Aktuelle Wallet-Balance: ${solBalance} SOL`);
    } catch (err) {
        logMessage(`Fehler beim Abrufen der Wallet-Balance: ${err.message}`);
        console.error(err);
    }
}

// Logs anzeigen
function logMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    logsDiv.innerHTML += `<p>[${timestamp}] ${message}</p>`;
    logsDiv.scrollTop = logsDiv.scrollHeight;
}
