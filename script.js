​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​// Globale Variable für die Bot-Wallet
let botWallet = null;

// Funktion zum Erstellen eines Accounts
async function createAccount() {
    console.log("createAccount wurde aufgerufen"); // Debugging

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Bitte gib Benutzername und Passwort ein!");
        console.log("Fehlende Eingaben");
        return;
    }

    console.log("Eingaben OK:", username, password); // Debugging

    // Prüfen, ob Solana Web3.js geladen ist
    if (!window.solanaWeb3 || !window.solanaWeb3.Keypair) {
        alert("Solana Web3.js nicht geladen!");
        console.error("Solana Web3.js fehlt");
        return;
    }

    // Neue Solana-Wallet generieren
    botWallet = window.solanaWeb3.Keypair.generate();
    const publicKey = botWallet.publicKey.toString();
    console.log("Wallet generiert:", publicKey); // Debugging

    // Wallet-Info anzeigen
    document.getElementById('walletAddress').innerText = publicKey;
    document.getElementById('status').innerText = `Account erstellt für ${username}. Wallet generiert.`;

    // Form ausblenden, Bot-Steuerung anzeigen
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('botControls').style.display = 'block';
}

// Event-Listener für Account-Erstellung
const createButton = document.getElementById('createAccount');
if (createButton) {
    createButton.addEventListener('click', createAccount);
    console.log("Event-Listener für createAccount hinzugefügt"); // Debugging
} else {
    console.error("Button #createAccount nicht gefunden!");
}

// Bot-Steuerung
document.getElementById('startBot').addEventListener('click', () => {
    document.getElementById('status').innerText = "Status: Bot läuft...";
});

document.getElementById('stopBot').addEventListener('click', () => {
    document.getElementById('status').innerText = "Status: Bot ist gestoppt";
});
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
