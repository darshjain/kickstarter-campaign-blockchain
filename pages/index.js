import React, { Component } from 'react'
import factory from '../ethereum/factory'
import 'semantic-ui-css/semantic.min.css'
import { Button, Card } from 'semantic-ui-react'

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    console.log('Succesfully received all the campaigns from the factory') //tested
    console.log(campaigns)
    return { campaigns }
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a> View Campaign </a>,
        fluid: true,
      }
    })
    return <Card.Group items={items} />
  }
  render() {
    return (
      <div>
        {this.renderCampaigns()}

        <Button content="Create Campaign" primary icon="add circle"></Button>
      </div>
    )
  }
}

export default CampaignIndex
