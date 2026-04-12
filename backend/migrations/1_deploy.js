const Identity = artifacts.require("Identity");

module.exports = async function (deployer) {
  await deployer.deploy(Identity);
};