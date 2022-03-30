import React, { Component } from 'react'
import Layout from '../../components/Layout'
import campaign from '../../ethereum/campaign'
import Campaign from '../../ethereum/campaign'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // console.log(props.query.address)
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    // console.log(summary)

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      nameOfStartup: summary[4],
      manager: summary[5],
    }
  }
  render() {
    return (
      <Layout>
        <h1>Campaign Details</h1>
      </Layout>
    )
  }
}
export default CampaignShow
