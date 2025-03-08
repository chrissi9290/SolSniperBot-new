const { Keypair } = require('@solana/web3.js');

function generateWallet() {
    const wallet = Keypair.generate();
    return {
        publicKey: wallet.publicKey.toString(),
        secretKey: Buffer.from(wallet.secretKey).toString('base64')
    };
}

module.exports = { generateWallet };
