const Web3 = require('web3');

module.exports = {
    getWeb3: function () {
        console.log('getWeb3')
        return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
};
