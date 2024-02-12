const fs = require('fs');
const crypto = require('crypto');

function calculateHash(previousHash, transactions, timestamp, nonce) {
    const blockString = previousHash + JSON.stringify(transactions) + timestamp + nonce;
    return crypto.createHash('sha256').update(blockString).digest('hex');
}

function mineBlock(previousHash, transactions, difficulty) {
    let nonce = 0;
    const targetPrefix = Array(difficulty + 1).join('0');
    let hash = calculateHash(previousHash, transactions, Date.now(), nonce);
    while (hash.substring(0, difficulty) !== targetPrefix) {
        nonce++;
        hash = calculateHash(previousHash, transactions, Date.now(), nonce);
    }
    return { hash, nonce };
}

function createGenesisBlock() {
    return {
        previousHash: '0',
        transactions: [{ sender: 'Genesis', recipient: 'Genesis', amount: 0 }],
        timestamp: Date.now(),
        nonce: 0,
        hash: '',
    };
}

function readTransactionsFromCSV(csvFilePath) {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvData.split('\n');
    const transactions = lines.slice(0, 3).map((line) => {
        const [sender, recipient, amount] = line.split(',');
        return { sender, recipient, amount: parseFloat(amount) };
    });
    return transactions;
}

function createBlock(previousHash, transactions, difficulty) {
    const { hash, nonce } = mineBlock(previousHash, transactions, difficulty);
    return { previousHash, transactions, timestamp: Date.now(), nonce, hash };
}

function createBlockchain(csvFilePath, difficulty) {
    const blockchain = [createGenesisBlock()];
    const transactions = readTransactionsFromCSV(csvFilePath);
    let previousHash = blockchain[0].hash;

    for (const transaction of transactions) {
        const newBlock = createBlock(previousHash, [transaction], difficulty);
        blockchain.push(newBlock);
        previousHash = newBlock.hash;
    }

    return blockchain;
}

function saveBlockchainToFile(blockchain) {
    const data = blockchain.map(block => JSON.stringify(block)).join('\n');
    fs.writeFileSync('./Outputs/block.txt', data);
}

const csvFilePath = './Memopool/mempool.csv';
const difficultyLevel = 3;
const blockchain = createBlockchain(csvFilePath, difficultyLevel);
saveBlockchainToFile(blockchain);
console.log("Blockchain saved to block.txt");



