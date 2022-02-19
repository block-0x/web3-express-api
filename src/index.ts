require('dotenv').config();
const express= require('express')
const app = express()
const port = 8000;
app.use(express.json())

const Web3 = require('web3');
const contract = require('truffle-contract');

const infuraEp = process.env.ADDRESS || '';

const hello = require('../build/contracts/Hello.json');
const contractAddress = process.env.CONTRACT_ADDRESS
const accountAddress = process.env.ACCOUNT_ADDRESS;
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"}]

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPPROVIDER))
}

async function getContract() {
  console.log('getContract')

  const contract = await new web3.eth.Contract(abi, contractAddress);
  await contract.methods.getMessage().call()
}

async function contractDeploy() {
  console.log('contractdeploy')

  const LMS = contract(hello)
  LMS.setProvider(web3.currentProvider)  
  await LMS.deployed();
}

async function createAccount() {
  console.log('createAccount')

  const account = await web3.eth.accounts.create();
  console.log(account)
  return account
}

async function getAccounts() {
  console.log('getAccounts')

  const accounts = await web3.eth.getAccounts();
  return accounts
}

// get: test
app.post('/test', (req, res) => {
  try {
    res.status(200).send('hello world!!!');
  } catch(e) {
    res.status(500).send('Error fetching /test');
  }
});

// post: contract deploy
app.post('/contractdeploy', (req, res) => {

  try {
    res.status(200).send(contractDeploy());
  } catch(e) {
    res.status(500).send('Error fetching /contractdeploy');
  }
});

// post: create account
app.post('/createaccount', (req, res) => {

  try {
    res.status(200).send(createAccount());
  } catch(e) {
    res.status(500).send('Error fetching /createaccount');
  }
});

// post: get accounts
app.post('/getaccounts', async (req, res) => {
  try {
    const data = await getAccounts()

    return res.send({
      data: data
    })
  } catch(e) {
    res.status(500).send('Error fetching /contractdo');
  }
});

// post: contract connect test
app.post('/getcontracttest', (req, res) => {

  try {
    res.status(200).send(getContract());
  } catch(e) {
    res.status(500).send('Error fetching /getcontracttest');
  }
});

const mongodb = require('mongodb').MongoClient
mongodb.connect(process.env.DB, { useUnifiedTopology: true }, async(err,client) => {
  client.db('Cluster0')
})

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
