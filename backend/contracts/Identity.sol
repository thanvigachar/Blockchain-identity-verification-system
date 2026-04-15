// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Identity {
    address public admin;

    struct User {
        string ipfsHash;
        bool isVerified;
        address walletAddress;
    }

    mapping(string => User) public usersBySrn;

    event Registered(string srn, string hash);
    event Verified(string srn);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can verify identities");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function register(string memory _srn, string memory _ipfsHash) public {
        require(bytes(_srn).length > 0, "SRN is required");
        require(bytes(_ipfsHash).length > 0, "IPFS hash is required");
        require(usersBySrn[_srn].walletAddress == address(0), "Identity already registered");

        usersBySrn[_srn] = User(_ipfsHash, false, msg.sender);
        emit Registered(_srn, _ipfsHash);
    }

    function verify(string memory _srn) public onlyAdmin {
        require(usersBySrn[_srn].walletAddress != address(0), "Identity not found");
        require(!usersBySrn[_srn].isVerified, "Identity already verified");

        usersBySrn[_srn].isVerified = true;
        emit Verified(_srn);
    }

    function getUser(string memory _srn) public view returns (string memory, bool, address) {
        return (usersBySrn[_srn].ipfsHash, usersBySrn[_srn].isVerified, usersBySrn[_srn].walletAddress);
    }
}
