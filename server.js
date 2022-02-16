require('dotenv').config();
const express= require('express')
const app = express()
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');

app.use(express.json())

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

// Global variables to represent Database
var TODOS = {
  'todo1': { 'task': 'build an API'},
  'todo2': { 'task': '?????'},
  'todo3': { 'task': 'profit!'},
};

async function contractDeploy() {
  const LMS = contract(artifacts)
  LMS.setProvider(web3.currentProvider)  
  const accounts = await web3.eth.getAccounts();
  await LMS.deployed();
  return accounts
}

// get test
app.get('/test', (req, res) => {
  try {
    res.status(200).send(TODOS);
  } catch(e) {
    res.status(500).send('Error fetching /todos');
  }
});

// post contract deploy
app.post('/contractdeploy', (req, res) => {

  try {
    res.status(200).send(contractDeploy());
  } catch(e) {
    res.status(500).send('Error fetching /todos');
  }
});

// post get nft
app.post('/contractdeploy', (req, res) => {

  try {
    res.status(200).send(contractDeploy());
  } catch(e) {
    res.status(500).send('Error fetching /todos');
  }
});

// post get nft
app.post('/contractdeploy', (req, res) => {

  try {
    res.status(200).send(contractDeploy());
  } catch(e) {
    res.status(500).send('Error fetching /todos');
  }
});

mongodb.connect(process.env.DB,{ useUnifiedTopology: true }, async(err,client)=>{
    const db =client.db('Cluster0')
    //const lms = LMS.at(contract_address) for remote nodes deployed on ropsten or rinkeby
    routes(app, db)
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port '+ (process.env.PORT || 8082));
     })
})
