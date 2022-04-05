import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // console.log(props.query.address)
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    // console.log(summary)

    return {
      address: props.query.address,
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

  renderTitle() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      nameOfStartup,
      manager,
    } = this.props
    console.log(nameOfStartup, 'Printed')
    return <h2>{nameOfStartup}</h2>
  }
  render() {
    return (
      <Layout>
        {/* <h1>Campaign Details</h1> */}
        {this.renderTitle()}
        <Grid>
          <Grid.Column width={10}>
            {this.renderCards()}
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}
export default CampaignShow
