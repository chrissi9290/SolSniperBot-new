async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const walletAddress = response.publicKey.toString();
            document.getElementById('walletStatus').innerText = 'Wallet verbunden: ' + walletAddress;
            localStorage.setItem('walletAddress', walletAddress);
            window.location.href = 'dashboard.html';
        } catch (err) {
            console.error('Wallet Verbindung fehlgeschlagen:', err);
        }
    } else {
        alert('Phantom Wallet nicht gefunden! Bitte installiere die Phantom Wallet.');
    }
}

function logout() {
    localStorage.removeItem('walletAddress');
    window.location.href = 'index.html';
}

function startSniping() {
    const solAmount = document.getElementById('solAmount').value;
    const slippage = document.getElementById('slippage').value;

    if (!solAmount || !slippage) {
        alert('Bitte SOL-Betrag und Slippage eingeben.');
        return;
    }

    document.getElementById('sniperStatus').innerText = 'Sniper-Status: Aktiv';
    console.log(`Sniping gestartet mit ${solAmount} SOL und ${slippage}% Slippage`);
}

window.onload = () => {
    const walletAddress = localStorage.getItem('walletAddress');
    if (!walletAddress && window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
    } else if (walletAddress && window.location.pathname === '/dashboard.html') {
        document.getElementById('walletAddress').innerText = 'Verbunden mit: ' + walletAddress;
    }
};
