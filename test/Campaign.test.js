const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' })
  ;[campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress,
  )
})
describe('Campaigns', () => {
  it('Deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })
  it('Marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(manager, accounts[0])
  })
  it('Allows people to contribute money and mark them as approvers', async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: '200' })
    const isContributer = await campaign.methods.approvers(accounts[1]).call()

    assert(isContributer)
  })
  it('Requires a Minimum Contribution ', async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ from: accounts[1], value: '5' })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })
  it('Allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' })
    const request = await campaign.methods.requests(0).call()

    assert.equal('Buy Batteries', request.description)
  })
  it('Processes Requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    })
    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: '1000000' })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    assert(balance > 104)
  })
})
