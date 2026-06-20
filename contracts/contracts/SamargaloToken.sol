// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SamargaloToken
 * @dev ERC-20 token with fixed supply minted to deployer
 */
contract SamargaloToken is ERC20 {
    /**
     * @dev Constructor that mints 1,000,000 tokens to the contract deployer
     * Token name: "Samargalo Custom Token"
     * Token symbol: "SCT"
     * Decimals: 18 (default)
     */
    constructor() ERC20("Samargalo Custom Token", "SCT") {
        _mint(msg.sender, 14 * 10 ** decimals());
    }
}
