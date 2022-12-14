// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StreaX is ERC20 { 

    // Max Total Supply =  1000 StreaX Tokens
    uint256 public constant maxTotalSupply = 1000 * 10**18;

    uint256 public tokenIds;

    constructor() ERC20("StreaXToken", "STX")  {

    }
    
    // This function will mint the Token
    function mint(uint256 amount) public payable {
        uint256 amountDecimals = amount * 10**18;
        require((totalSupply() + amountDecimals) <= maxTotalSupply,
        "The amount to be mined is greater than the total"
        ); 
        _mint(msg.sender, amountDecimals);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 amountDecimals = amount * 10**18;
        address owner = msg.sender;
        _transfer(owner, to, amountDecimals);
        return true;
    }

}
