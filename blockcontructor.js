const fs = require('fs');

// Transaction data directly provided
const data = fs.readFileSync('./Memopool/mempool.csv', 'utf8')
// Parse transactions from provided data
const transactions = data.map(line => line.split(','));

// Create an empty block
const block = [];
let totalWeight = 0;
let totalFee = 0;

// Sort transactions by fee-to-weight ratio in descending order
transactions.sort((a, b) => (parseInt(b[1]) / parseInt(b[2])) - (parseInt(a[1]) / parseInt(a[2])));

// Iterate through transactions
for (const transaction of transactions) {
  const [txid, fee, weight, parentTxids] = transaction;

  // Check if transaction can be included in the block
  if (parseInt(weight) + totalWeight <= 4000000 && (!parentTxids || parentTxids.split(';').every(parentTxid => block.includes(parentTxid)))) {
    block.push(txid);
    totalWeight += parseInt(weight);
    totalFee += parseInt(fee);
  }git
}

// Write the block data to a file
fs.writeFileSync('./Outputs/block.txt', block.join('\n'));

// Print the txids of the transactions in the block
console.log('Block data has been written to block.txt');
