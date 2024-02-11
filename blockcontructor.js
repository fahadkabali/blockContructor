const fs = require('fs');

// Function to read mempool.csv file and parse transactions
function readMempool(filename) {
    const transactions = {};
    const data = fs.readFileSync(filename, 'utf8').split('\n');
    for (const line of data) {
        const [txid, fee, weight, parents] = line.split(',');
        transactions[txid] = {
            fee: parseInt(fee),
            weight: parseInt(weight),
            parents: parents ? parents.split(';') : [],
            included: false // Flag to track if transaction is included in block
        };
    }
    return transactions;
}

// Function to select transactions for the block
function selectTransactions(transactions, maxWeight) {
    const selectedTransactions = [];
    let totalWeight = 0;
    let totalFee = 0;

    // Greedy approach: sort transactions by fee and select highest fee transactions until max weight is reached
    const sortedTransactions = Object.entries(transactions).sort((a, b) => b[1].fee - a[1].fee);
    for (const [txid, txData] of sortedTransactions) {
        if (!txData || txData.included) continue; // Skip if transaction data is undefined or already included
        if (totalWeight + txData.weight <= maxWeight) {
            // Check if all parent transactions are included before including current transaction
            if (txData.parents.every(parent => transactions[parent] && transactions[parent].included)) {
                selectedTransactions.push(txid);
                totalWeight += txData.weight;
                totalFee += txData.fee;
                transactions[txid].included = true;
            }
        }
    }
    return { selectedTransactions, totalFee };
}


// Function to write selected transactions to file
function writeBlock(selectedTransactions, outputFilename) {
    try {
        fs.writeFileSync(outputFilename, selectedTransactions.join('\n'));
        console.log(`Block written to ${outputFilename}`);
    } catch (error) {
        console.error(`Error writing block to ${outputFilename}:`, error.message);
    }
}


// Main function
function main() {
    const mempoolFilename = './Memopool/mempool.csv';
    const outputFilename = './Outputs/block.txt';
    const maxBlockWeight = 4000000; // Maximum block weight

    // Read transactions from mempool file
    const transactions = readMempool(mempoolFilename);

    // Select transactions for the block
    const { selectedTransactions, totalFee } = selectTransactions(transactions, maxBlockWeight);

    // Write selected transactions to file
    writeBlock(selectedTransactions, outputFilename);

    // Print total fee and number of transactions in the block
    console.log(`Total Fee: ${totalFee} satoshis`);
    console.log(`Number of Transactions: ${selectedTransactions.length}`);
}

// Execute main function
main();
