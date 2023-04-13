// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmVD3EqwadDqD2NPSedegLLb1DHQHyidfns7CtgumuxnYR/";
    }

    function safeMint(uint256 uri) public onlyOwner {
        uint256 tokenId = uint(uri);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, Strings.toString(uri));
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
