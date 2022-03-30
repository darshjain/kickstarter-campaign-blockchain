import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

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
  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      nameOfStartup,
      manager,
    } = this.props
    const items = [
      {
        header: manager,
        meta: 'Address Of Manager',
        description:
          'The Manager Created this campaign and can requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'The number of donaters to this campaign',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'The number of requests to withdraw ether from this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance(Ether)',
        description: 'The Balance Ether in this campaign',
      },
    ]
    return <Card.Group items={items} />
  }
  render() {
    return (
      <Layout>
        <h1>Campaign Details</h1>
        {this.renderCards()}
      </Layout>
    )
  }
}
export default CampaignShow
