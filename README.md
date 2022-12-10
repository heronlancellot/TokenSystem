# TokenSystem
- Create, Issue Tokens, transfer tokens
- ERC20


## Hardhat
- Install Hardhat:
    ```
    npm install --save-dev hardhat
    ````

- Initialize Hardhat
    ```
    npx hardhat
    ```
- Install Dependencies Hardhat
    ```
    npm install --save-dev "hardhat@^2.12.2" "@nomicfoundation/hardhat-toolbox@^2.0.0"
    ```
## OpenZeppelin
- Install OpenZeppelin
    ```
    npm install @openzeppelin/contracts
    ```

## Environment Variable
- Install Dotenv
    ```
    npm install dotenv --save
    ```
    - Environment variables

## Web3modal & ethers
- Install Web3Modal [frontend]
    ```
        npm install web3modal
    ```
- Install ethers [frontend]
    ```
        npm install ethers
    ```

- Deploy on Goerli Testnet    
    ```
    npx hardhat run scripts/deploy.js --network goerli <other args>,
    ```
- Verify contract 
    ```
        hardhat verify --contract contracts/Example.sol:ExampleContract <other args>

    ```
[Contract Etherscan](https://goerli.etherscan.io/address/0x32408AA5bEa0E00Aa7e178e054b09FA092c6725b#code)