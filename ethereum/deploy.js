const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
require('dotenv/config')
const provider = new HDWalletProvider(
  process.env.KEYPHRASE_WALLET,
  process.env.INFURA_KEY,
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('PASS')
  console.log('ATTEMPTING DEPLOY FROM', accounts[0])

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('CONTRACT DEPLOYED:', result.options.address)
}
deploy()
