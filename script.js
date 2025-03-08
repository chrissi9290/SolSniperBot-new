// Globale Variable für die Bot-Wallet
let botWallet = null;

// Funktion zum Erstellen eines Accounts und Generieren einer Wallet
async function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Bitte gib Benutzername und Passwort ein!");
        return;
    }

    // Neue Solana-Wallet generieren
    botWallet = window.solanaWeb3.Keypair.generate();
    const publicKey = botWallet.publicKey.toString();
    const privateKey = Array.from(botWallet.secretKey); // Private Key als Array

    // Wallet-Info anzeigen
    document.getElementById('walletAddress').innerText = publicKey;
    document.getElementById('status').innerText = `Account erstellt für ${username}. Wallet generiert.`;
    console.log("Private Key (sicher speichern!):", privateKey); // Nur für Debugging, später entfernen!

    // Form ausblenden, Bot-Steuerung anzeigen
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('botControls').style.display = 'block';

    // Account-Info im localStorage speichern (für Prototyp, später serverseitig)
    localStorage.setItem('username', username);
    localStorage.setItem('botPublicKey', publicKey);
    localStorage.setItem('botPrivateKey', JSON.stringify(privateKey)); // Unsicher, nur für Prototyp!
}

// Event-Listener für Account-Erstellung
document.getElementById('createAccount').addEventListener('click', createAccount);

// Bot-Steuerung
document.getElementById('startBot').addEventListener('click', () => {
    if (!botWallet) {
        alert("Bitte erstelle zuerst einen Account!");
        return;
    }
    document.getElementById('status').innerText = "Status: Bot läuft...";
});

document.getElementById('stopBot').addEventListener('click', () => {
    if (!botWallet) {
        alert("Bitte erstelle zuerst einen Account!");
        return;
    }
    document.getElementById('status').innerText = "Status: Bot ist gestoppt";
});

// Beim Laden prüfen, ob ein Account existiert (für Prototyp)
window.onload = () => {
    const savedUsername = localStorage.getItem('username');
    const savedPublicKey = localStorage.getItem('botPublicKey');
    if (savedUsername && savedPublicKey) {
        document.getElementById('walletAddress').innerText = savedPublicKey;
        document.getElementById('status').innerText = `Willkommen zurück, ${savedUsername}!`;
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('botControls').style.display = 'block';
        // Private Key könnte hier geladen werden, aber nur für Prototyp
    }
};
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
