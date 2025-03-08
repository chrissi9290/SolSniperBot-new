// Globale Variablen
let walletAddress = null;
let walletProvider = null;

// Verbindung zum Solana-Cluster
const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl('mainnet-beta'),
    'confirmed'
);

// Funktion zum Verbinden mit dem Phantom Wallet
document.getElementById('connectPhantomButton').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            walletAddress = response.publicKey.toString();
            walletProvider = window.solana;
            document.getElementById('walletAddress').textContent = `Phantom Wallet verbunden: ${walletAddress}`;
            document.getElementById('snipeButton').disabled = false;
            console.log('Phantom Wallet verbunden:', walletAddress);
        } catch (err) {
            console.error('Verbindung mit Phantom Wallet fehlgeschlagen:', err);
            alert('Verbindung mit Phantom Wallet fehlgeschlagen.');
        }
    } else {
        alert('Bitte installiere das Phantom Wallet über https://phantom.app');
    }
});

// Funktion zum Verbinden mit dem Solflare Wallet
document.getElementById('connectSolflareButton').addEventListener('click', async () => {
    if (window.solflare) {
        try {
            await window.solflare.connect();
            walletAddress = window.solflare.publicKey.toString();
            walletProvider = window.solflare;
            document.getElementById('walletAddress').textContent = `Solflare Wallet verbunden: ${walletAddress}`;
            document.getElementById('snipeButton').disabled = false;
            console.log('Solflare Wallet verbunden:', walletAddress);
        } catch (err) {
            console.error('Verbindung mit Solflare Wallet fehlgeschlagen:', err);
            alert('Verbindung mit Solflare Wallet fehlgeschlagen.');
        }
    } else {
        alert('Bitte installiere das Solflare Wallet über https://solflare.com');
    }
});

// Funktion zum Testen der Sniping-Funktion
async function executeSniping() {
    if (!walletAddress || !walletProvider) {
        alert('Bitte verbinde zuerst dein Wallet!');
        return;
    }

    console.log('Starte Sniping...');
    document.getElementById('status').textContent = 'Starte Sniping...';

    try {
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
        const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;

        document.getElementById('status').textContent = `Sniping erfolgreich! Dein Guthaben: ${solBalance.toFixed(4)} SOL`;
        console.log('Guthaben:', solBalance, 'SOL');
    } catch (error) {
        console.error('Fehler beim Snipen:', error);
        document.getElementById('status').textContent = 'Fehler beim Snipen!';
    }
}

// Button zum Snipen
document.getElementById('snipeButton').addEventListener('click', () => {
    executeSniping();
});

// Automatische Erkennung der Wallets beim Laden der Seite
window.addEventListener('load', () => {
    console.clear();

    if (window.solana && window.solana.isPhantom) {
        console.log('Phantom Wallet erkannt!');
    } else {
        console.warn('Kein Phantom Wallet gefunden.');
    }

    if (window.solflare) {
        console.log('Solflare Wallet erkannt!');
    } else {
        console.warn('Kein Solflare Wallet gefunden.');
    }
});
