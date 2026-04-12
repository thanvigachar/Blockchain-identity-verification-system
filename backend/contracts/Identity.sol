// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Identity {

    struct User {
        string ipfsHash;
        bool isVerified;
    }

    mapping(address => User) public users;

    event Registered(address user, string hash);
    event Verified(address user);

    function register(string memory _ipfsHash) public {
        users[msg.sender] = User(_ipfsHash, false);
        emit Registered(msg.sender, _ipfsHash);
    }

    function verify(address _user) public {
        users[_user].isVerified = true;
        emit Verified(_user);
    }

    function getUser(address _user) public view returns (string memory, bool) {
        return (users[_user].ipfsHash, users[_user].isVerified);
    }
}