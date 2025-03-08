async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (data.success) {
        alert('Registrierung erfolgreich! Wallet: ' + data.wallet);
    } else {
        alert('Fehler: ' + data.message);
    }
}
