pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint minimum,string nameStartup) public {
        address newCampaign = new Campaign(minimum,nameStartup,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete; 
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    string nameOfStartup;
    
    Request[] public requests;
    
    address public manager;
    uint256 public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    function Campaign(uint minimum,string nameStartup , address creator) public {
        manager= creator;
        minimumContribution = minimum;
        nameOfStartup = nameStartup;
    }
    function contribute() public payable{
        require(msg.value>minimumContribution);
        approvers[msg.sender]=true;
        approversCount++;
    }
    function createRequest(string description, uint value,address recipient) public restricted {
        // require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount:0
        });
        
        requests.push(newRequest);
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvalCount++;
        request.approvals[msg.sender]=true;
    }
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > approversCount/2);
        request.recipient.transfer(request.value);
        request.complete= true;
        
    } 
    function getSummary() public view returns(uint,uint,uint,uint,string,address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            nameOfStartup,
            manager
        );
    }
    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}