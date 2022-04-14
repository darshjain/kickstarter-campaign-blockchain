import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xe031A7742336Fd9A825E6d131aa471d175004355',
)
export default instance
