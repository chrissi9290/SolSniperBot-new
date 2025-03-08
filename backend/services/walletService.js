// walletService.js
const { Keypair } = require('@solana/web3.js');

const createWallet = () => {
    const wallet = Keypair.generate();
    return {
        publicKey: wallet.publicKey.toString(),
        secretKey: wallet.secretKey.toString('base64')
    };
};

module.exports = { createWallet };
