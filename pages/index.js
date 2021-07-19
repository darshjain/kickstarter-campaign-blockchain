import React, { Component } from 'react'
import factory from '../ethereum/factory'

class CampaignIndex extends Component{
    async componentDidMount(){
        const campaign = await factory.methods.getDeployedCampaigns().call()
        console.log(campaign)
        
    }
    render(){
        return <div>Campaign Index!</div>
    }
}

export default CampaignIndex