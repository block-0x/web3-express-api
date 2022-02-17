const Hello = artifacts.require("Hello");

module.exports = function (deployer) {
  deployer.deploy(Hello);
};

console.log("nft deployed to:", nft.address);
