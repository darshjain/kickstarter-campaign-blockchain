import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../routes'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    nameCampaign: '',
    errorMessage: '',
    loading: false,
    descriptionCampaign: '',
  }
  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(
          this.state.minimumContribution,
          this.state.nameCampaign,
          this.state.descriptionCampaign,
        )
        .send({
          from: accounts[0],
        })

      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <Layout>
        <h3>Create The Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name Of The Startup</label>
            <Input
              value={this.state.nameCampaign}
              onChange={(event) =>
                this.setState({ nameCampaign: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description Of Startup</label>
            <Input
              value={this.state.descriptionCampaign}
              onChange={(event) =>
                this.setState({ descriptionCampaign: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.setState.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}
export default CampaignNew
