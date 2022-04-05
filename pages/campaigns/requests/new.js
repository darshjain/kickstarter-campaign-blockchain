import React, { Component } from 'react'
import { Button, Form, Message, Input } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import { Link, Router } from '../../../routes'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: '',
  }
  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }
  onSubmit = async (event) => {
    event.preventDefault()
    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state
    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      console.log(err)
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Add A New Request to the campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Message
            error
            header="Oops!"
            content={this.state.errorMessage}
          ></Message>
          <Button primary loading={this.state.loading}>
            Add the Request
          </Button>
        </Form>
      </Layout>
    )
  }
}
export default RequestNew
