import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x927fdBeF99c834b241F7b04b1F021d341fBaa25B',
)
export default instance
