import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }
  render() {
    console.log('PASSED REQUESTS')
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add A Request</Button>
          </a>
        </Link>
      </Layout>
    )
  }
}
export default RequestIndex
