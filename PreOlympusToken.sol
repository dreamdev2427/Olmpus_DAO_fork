// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract Divine is ERC20, Ownable {
    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_) {}
}

contract PreOlympusToken is Divine {
    bool public requireSellerApproval;
    bool public allowMinting;

    mapping(address => uint256) private _balances;
    mapping(address => bool) public isApprovedSeller;

    constructor() Divine( "PreOlympus", "pOLY") {
        uint256 initialSupply = 1_000_000_000 * 1e18;
        requireSellerApproval = true;
        allowMinting = true;
        _addApprovedSeller(address(this));
        _addApprovedSeller(_msgSender());
        _mint(owner(), initialSupply);
    }

    function allowOpenTrading() external onlyOwner returns (bool) {
        requireSellerApproval = false;
        return requireSellerApproval;
    }

    function disableMinting() external onlyOwner returns (bool) {
        allowMinting = false;
        return allowMinting;
    }

    function _addApprovedSeller(address approvedSeller) internal {
        isApprovedSeller[approvedSeller] = true;
    }

    function addApprovedSeller(address approvedSeller) external onlyOwner returns (bool) {
        _addApprovedSeller(approvedSeller);
        return isApprovedSeller[approvedSeller];
    }

    function addApprovedSellers(address[] calldata approvedSellers) external onlyOwner returns (bool) {
        for (uint256 i; i < approvedSellers.length; i++) {
            _addApprovedSeller(approvedSellers[i]);
        }
        return true;
    }

    function _removeApprovedSeller(address disapprovedSeller) internal {
        isApprovedSeller[disapprovedSeller] = false;
    }

    function removeApprovedSeller(address disapprovedSeller) external onlyOwner returns (bool) {
        _removeApprovedSeller(disapprovedSeller);
        return isApprovedSeller[disapprovedSeller];
    }

    function removeApprovedSellers(address[] calldata disapprovedSellers) external onlyOwner returns (bool) {
        for (uint256 i; i < disapprovedSellers.length; i++) {
            _removeApprovedSeller(disapprovedSellers[i]);
        }

        return true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal view override {
        if (from != address(0)) {
            require(_balances[to] > 0 || isApprovedSeller[from], "Account not approved to transfer pOLY.");
        }
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        require(allowMinting, "Minting has been disabled.");
        _mint(recipient, amount);
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public {
        _burnFrom(account, amount);
    }

    function _burnFrom(address account, uint256 amount) internal {
        _approve(account, _msgSender(), allowance(account, _msgSender()) - amount);
        _burn(account, amount);
    }
}
