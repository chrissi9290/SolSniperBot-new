// Prüfen, ob Phantom verfügbar ist
async function connectWallet() {
    console.log("Button geklickt!"); // Test, ob der Button funktioniert
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const publicKey = response.publicKey.toString();
            document.getElementById('status').innerText = `Wallet verbunden: ${publicKey}`;
        } catch (err) {
            console.error("Fehler bei der Wallet-Verbindung:", err);
            document.getElementById('status').innerText = "Fehler bei der Wallet-Verbindung";
        }
    } else {
        alert("Bitte installiere die Phantom-Wallet-Erweiterung!");
        console.log("Phantom nicht gefunden");
    }
}

// Event-Listener für Buttons
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('startBot').addEventListener('click', () => {
    document.getElementById('status').innerText = "Status: Bot läuft...";
});
document.getElementById('stopBot').addEventListener('click', () => {
    document.getElementById('status').innerText = "Status: Bot ist gestoppt";
});
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
