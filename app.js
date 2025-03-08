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
            const response = await window.solana.connect();
            walletAddress = response.publicKey.toString();
            walletProvider = window.solana;
            document.getElementById('walletAddress').textContent = `Phantom Wallet verbunden: ${walletAddress}`;
            console.log('Phantom Wallet verbunden:', walletAddress);
        } catch (err) {
            console.error('Verbindung mit Phantom Wallet fehlgeschlagen:', err);
        }
    } else {
        alert('Bitte installiere das Phantom Wallet!');
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
            console.log('Solflare Wallet verbunden:', walletAddress);
        } catch (err) {
            console.error('Verbindung mit Solflare Wallet fehlgeschlagen:', err);
        }
    } else {
        alert('Bitte installiere das Solflare Wallet!');
    }
});

// Sniper-Bot-Funktion zum Snipen von Token
async function executeSniping() {
    if (!walletAddress || !walletProvider) {
        alert('Bitte verbinde zuerst dein Wallet!');
        return;
    }

    console.log('Starte Sniping...');
    document.getElementById('status').textContent = 'Starte Sniping...';

    try {
        const transaction = new solanaWeb3.Transaction();

        // Beispiel: Transaktionsanweisung (Pseudocode)
        const instruction = solanaWeb3.SystemProgram.transfer({
            fromPubkey: new solanaWeb3.PublicKey(walletAddress),
            toPubkey: new solanaWeb3.PublicKey(walletAddress), // Beispiel: Dummy-Zieladresse
            lamports: 1000, // Beispiel: 1000 Lamports senden
        });

        transaction.add(instruction);

        const { signature } = await walletProvider.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);

        console.log('Transaktion erfolgreich:', signature);
        document.getElementById('status').textContent = 'Sniping erfolgreich!';
    } catch (error) {
        console.error('Fehler beim Snipen:', error);
        document.getElementById('status').textContent = 'Fehler beim Snipen!';
    }
}

// Button zum Snipen
document.getElementById('snipeButton').addEventListener('click', () => {
    executeSniping();
});
