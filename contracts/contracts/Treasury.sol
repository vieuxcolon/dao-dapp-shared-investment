// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Treasury
 * @notice Holds and releases ETH based on DAO governance decisions
 */
contract Treasury {
    address public dao;

    // Optional: track deposits by each sender
    mapping(address => uint256) public deposits;

    event FundsReceived(address indexed sender, uint256 amount);
    event FundsReleased(address indexed to, uint256 amount);

    modifier onlyDAO() {
        require(msg.sender == dao, "Only DAO can call");
        _;
    }

    constructor(address daoAddress) {
        require(daoAddress != address(0), "Invalid DAO address");
        dao = daoAddress;
    }

    /**
     * @notice Deposit ETH into the treasury
     */
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        deposits[msg.sender] += msg.value;
        emit FundsReceived(msg.sender, msg.value);
    }

    /**
     * @notice Fallback to accept plain ETH transfers
     */
    receive() external payable {
        deposits[msg.sender] += msg.value;
        emit FundsReceived(msg.sender, msg.value);
    }

    /**
     * @notice Transfer ETH to a recipient (DAO-approved)
     */
    function releaseFunds(address payable to, uint256 amount)
        external
        onlyDAO
    {
        require(address(this).balance >= amount, "Insufficient balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit FundsReleased(to, amount);
    }

    /**
     * @notice Get treasury ETH balance
     */
    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}

