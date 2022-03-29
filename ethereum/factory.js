import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x30cFE0Cd85Df1aa39304f402818Af4DcfF8dC818',
)
export default instance
