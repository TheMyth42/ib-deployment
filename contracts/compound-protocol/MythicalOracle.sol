pragma solidity ^0.5.16;

import "./PriceOracle.sol";
import "./CToken.sol";
import "./CErc20.sol";
import "./EIP20Interface.sol";

contract MythicalOracle is PriceOracle {
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin may call");
        _;
    }

    mapping(address => uint) internal prices;

    constructor() public {
        admin = msg.sender;
    }

    function assetPrices(address asset) external view returns (uint256) {
        return prices[asset];
    }

    function getUnderlyingPrice(CToken cToken) public view returns (uint256) {
        EIP20Interface token = EIP20Interface(CErc20(address(cToken)).underlying());
        return prices[address(token)];
    }

    function setUnderlyingPrice(CToken cToken, uint256 underlyingPrice) external onlyAdmin {
        address asset = address(CErc20(address(cToken)).underlying());
        prices[asset] = underlyingPrice;
    }

    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
