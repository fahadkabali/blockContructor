#Simple Blockchain Implementation in Node.js
This repository contains a simple implementation of a blockchain in Node.js. The blockchain consists of blocks containing transactions, and the blocks are linked together using cryptographic hashes.

Features
Blockchain Creation: Generates a blockchain from transaction data stored in a CSV file.
Proof of Work: Implements a simple proof-of-work algorithm to mine new blocks.
File Saving: Saves the blockchain to a file named block.txt.
Prerequisites
    Node.js installed on your system
Usage
Clone the repository to your local machine:

bash
Copy code
    git clone https://github.com/fahadkabali/blockContructor.git
Navigate to the project directory:

bash
Copy code
    cd blockchain-node
Install dependencies:

bash
Copy code
    npm install
Add your transaction data to the mempool.csv file.

Run the script to generate the blockchain:

bash
Copy code
    npm start
Once completed, the blockchain will be saved to a file named block.txt in the Outputs directory.

File Structure
blockchain.js: Contains the blockchain implementation.
Memopool/mempool.csv: CSV file containing transaction data.
Outputs/block.txt: Output file where the generated blockchain is saved.
README.md: This file, containing instructions and information about the project.