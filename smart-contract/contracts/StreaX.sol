// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StreaX is ERC20 { 

    // Max Total Supply =  100 StreaX Tokens
    uint256 public constant maxTotalSupply = 100 * 10**18;

    uint256 public tokenIds;

    constructor() ERC20("StreaXToken", "STX")  {

    }
    
    // This function will mint the Token
    function mint(uint256 amount) public payable {
        require(tokenIds < maxTotalSupply, "The amount to be mined is greater than the total");
        _mint(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        address owner = msg.sender;
        _transfer(owner, to, amount);
        return true;
    }

}
