import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import Layout from '../../components/Layout'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    nameCampaign: '',
  }
  render() {
    return (
      <Layout>
        <h3>Create The Campaign</h3>
        <Form>
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
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    )
  }
}
export default CampaignNew
