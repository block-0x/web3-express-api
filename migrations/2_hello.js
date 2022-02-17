const Hello = artifacts.require("Hello");

module.exports = function (deployer) {
  const address = deployer.deploy(Hello);

  console.log("nft deployed to:", address);
};
