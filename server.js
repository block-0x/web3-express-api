require('dotenv').config();
const express= require('express')
const app = express()
const port = 8000;
app.use(express.json())

const mongodb = require('mongodb').MongoClient
mongodb.connect(process.env.DB, { useUnifiedTopology: true }, async(err,client) => {
  client.db('Cluster0')
})

const Web3 = require('web3');
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

async function contractDeploy() {
  console.log('contractdeploy')

  const LMS = contract(artifacts)
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
  console.log(accounts)
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

// post: create account
app.post('/getaccounts', (req, res) => {

  try {
    res.status(200).send(getAccounts());
  } catch(e) {
    res.status(500).send('Error fetching /getaccounts');
  }
});

// post: create account
app.post('/getaccounts', (req, res) => {

  try {
    res.status(200).send(getAccounts());
  } catch(e) {
    res.status(500).send('Error fetching /getaccounts');
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});