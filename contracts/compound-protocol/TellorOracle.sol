pragma solidity ^0.5.16;

import "./UsingTellor.sol";
import "./PriceOracle.sol";
import "./SafeMath.sol";
import "./CToken.sol";
import "./CErc20.sol";
import "./EIP20Interface.sol";


contract TellorOracle is PriceOracle, UsingTellor {
    using SafeMath for uint;
    
    constructor(address payable tellor) UsingTellor(tellor) public {}

    function getUnderlyingPrice(CToken cToken) public view returns (uint) {
       EIP20Interface token = EIP20Interface(CErc20(address(cToken)).underlying());
        bytes memory _queryData = abi.encode("SpotPrice", abi.encode(toLowerCase(token.symbol()), "usd"));
        bytes32 _queryId = keccak256(_queryData);
        (bytes memory _value, uint256 _timestampRetrieved) =
            _getDataBefore(_queryId, block.timestamp - 20 minutes);
        if (_timestampRetrieved == 0) return 0;
        require(block.timestamp - _timestampRetrieved < 24 hours);
        return abi.decode(_value, (uint256));
    }

    function toLowerCase(string memory str) public pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        
        for (uint i = 0; i < bStr.length; i++) {
            if (uint8(bStr[i]) >= 65 && uint8(bStr[i]) <= 90) {
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }
}
