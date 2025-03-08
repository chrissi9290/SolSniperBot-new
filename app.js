document.getElementById('snipeButton').addEventListener('click', () => {
    startSniping();
});

function startSniping() {
    console.log('Starte Sniping...');
    document.getElementById('status').textContent = 'Starte Sniping...';

    // Simulierte Sniping-Logik
    const success = Math.random() > 0.5; // Zufälliger Erfolg (50%)

    setTimeout(() => {
        if (success) {
            console.log('Sniping erfolgreich!');
            document.getElementById('status').textContent = 'Sniping erfolgreich!';
        } else {
            console.log('Sniping fehlgeschlagen.');
            document.getElementById('status').textContent = 'Sniping fehlgeschlagen.';
        }
    }, 2000); // Simulierter Sniping-Prozess (2 Sekunden)
}
