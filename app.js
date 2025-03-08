// API Endpoints
const BIRDEYE_API = "https://public-api.birdeye.so/public";
const SOLSCAN_API = "https://api.solscan.io/token/meta?tokenAddress=";

// HTML-Elemente für Sicherheitsoptionen
const honeypotCheckToggle = document.getElementById('honeypotCheck');
const liquidityCheckToggle = document.getElementById('liquidityCheck');
const checkFreezableToggle = document.getElementById('checkFreezable');
const checkMintableToggle = document.getElementById('checkMintable');
const checkImmutableToggle = document.getElementById('checkImmutable');
const checkLPBurnedToggle = document.getElementById('checkLPBurned');
const skipLPBundlesToggle = document.getElementById('skipLPBundles');
const checkSocialsToggle = document.getElementById('checkSocials');
const skipPumpTokensToggle = document.getElementById('skipPumpTokens');

// Token-Sicherheitsprüfung im Hintergrund
async function checkTokenSafety(tokenAddress) {
    logMessage(`Starte Sicherheitsprüfung für Token: ${tokenAddress}`);

    // Honeypot-Check über die Birdeye API
    if (honeypotCheckToggle.checked) {
        logMessage('Führe Honeypot-Check durch...');
        try {
            const response = await fetch(`${BIRDEYE_API}/token/${tokenAddress}/security`);
            const data = await response.json();
            if (data.is_honeypot) {
                logMessage(`WARNUNG: Token ${tokenAddress} ist ein Honeypot!`, true);
                return false;
            }
            logMessage(`Honeypot-Check bestanden.`);
        } catch (err) {
            logMessage(`Fehler beim Honeypot-Check: ${err.message}`, true);
            return false;
        }
    }

    // Liquiditätsprüfung
    if (liquidityCheckToggle.checked) {
        logMessage('Prüfe Liquidität des Tokens...');
        try {
            const response = await fetch(`${BIRDEYE_API}/token/${tokenAddress}/liquidity`);
            const data = await response.json();
            if (data.liquidity < 1000) {
                logMessage(`WARNUNG: Zu wenig Liquidität (${data.liquidity} USD)`, true);
                return false;
            }
            logMessage(`Liquiditätsprüfung bestanden.`);
        } catch (err) {
            logMessage(`Fehler bei der Liquiditätsprüfung: ${err.message}`, true);
            return false;
        }
    }

    // Überprüfung über Solscan API (Freezable, Mintable, Immutable)
    if (checkFreezableToggle.checked || checkMintableToggle.checked || checkImmutableToggle.checked) {
        logMessage('Prüfe Token-Eigenschaften über Solscan...');
        try {
            const response = await fetch(`${SOLSCAN_API}${tokenAddress}`);
            const data = await response.json();

            if (checkFreezableToggle.checked && data.data.is_freeze_authority) {
                logMessage(`WARNUNG: Token ${tokenAddress} ist freezable!`, true);
                return false;
            }

            if (checkMintableToggle.checked && data.data.is_mint_authority) {
                logMessage(`WARNUNG: Token ${tokenAddress} ist mintable!`, true);
                return false;
            }

            if (checkImmutableToggle.checked && !data.data.is_immutable) {
                logMessage(`WARNUNG: Token ${tokenAddress} ist nicht immutable!`, true);
                return false;
            }

            logMessage(`Token-Eigenschaften sind sicher.`);
        } catch (err) {
            logMessage(`Fehler bei der Token-Eigenschaftsprüfung: ${err.message}`, true);
            return false;
        }
    }

    logMessage(`Sicherheitsprüfung für ${tokenAddress} erfolgreich abgeschlossen.`);
    return true;
}
