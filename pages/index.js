import React, { Component } from 'react'
import factory from '../ethereum/factory'
import 'semantic-ui-css/semantic.min.css'
import { Button, Card } from 'semantic-ui-react'
import Layout from '../components/Layout'
import { Link } from '../routes'
import Campaign from '../ethereum/campaign'

class CampaignIndex extends Component {
  static async getInitialProps(props) {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    async function summary() {
      var arraySummaryCampaign = []
      for (let i = 0; i < campaigns.length; i++) {
        const campaign = await Campaign(campaigns[i])
        const summaryContent = await campaign.methods.getSummary().call()
        // console.log(summaryContent)
        arraySummaryCampaign.push(summaryContent['4'])
      }
      // console.log(arraySummaryCampaign) //CHECKS OUT TILL HERE
      return arraySummaryCampaign
    }
    let arraySummaryCampaigns = await summary()
    // console.log(summary(), 'Checks')
    console.log('Succesfully received all the campaigns from the factory') //tested
    console.log(arraySummaryCampaigns, 'Checks')
    return { campaigns, arraySummaryCampaigns }
  }
  renderCampaigns() {
    let i = -1
    const items = this.props.campaigns.map((address) => {
      // const campaign = Campaign(address)
      // const summary = campaign.methods.getSummary().call()
      // console.log(this.props.arraySummaryCampaigns,"Returned")
      // console.log(this.props.arraySummaryCampaigns, 'NOT PRINT')
      i += 1
      return {
        header: this.props.arraySummaryCampaigns[i],
        description: (
          <Link route={`/campaigns/${address}`}>
            <a> View Campaign </a>
          </Link>
        ),
        fluid: true,
      }
      
    })
    return <Card.Group items={items} />
  }
  render() {
    return (
      <Layout>
        <div>
          <link rel="stylesheet" href="./assets/css/index.css"></link>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                content="Create Campaign"
                primary
                icon="add circle"
                floated="right"
              ></Button>
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex
