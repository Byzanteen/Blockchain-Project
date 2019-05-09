import React from "react";
import AccountNames from "./Constants"

class Read extends React.Component {
  state = { dataKey: null };
  accounts = 0; 

  getAccountLength() {
    const { drizzleState } = this.props;
    var k=0;
    for(;drizzleState.accounts[k]!==undefined;k++);
    this.accounts = k;
    
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Chatgroup;

    // let drizzle know we want to watch the `myString` method
    let dataKey = [];
    for(var j = 0;j<100;j++){
      dataKey[j] = contract.methods["messages"].cacheCall(j);
    }
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  getAccountNumber(account) {
    const { drizzleState } = this.props;

    for(var i = 0;i<this.accounts;i++){
      if(drizzleState.accounts[i] === account)
        return AccountNames[i].name;
    }
    return "null";
  }

  render() {
    // get the contract state from drizzleState
    const { Chatgroup } = this.props.drizzleState.contracts;
    this.getAccountLength();

    const chatStyle = {
      height: '80vh',
      overflow:'auto',
      border:"solid black 1px",
      backgroundColor: "#546F6F",
      color: "white",
      fontWeight: "normal",
      fontFamily: "Verdana"
    };

    // using the saved `dataKey`, get the variable we're interested in
    let myData = [] ;
    let j = 0;
    
    if(this.state.dataKey !== null ){
    for(;j<100;j++){
        if (Chatgroup.messages[this.state.dataKey[j]] !== undefined &&
          Chatgroup.messages[this.state.dataKey[j]].value !== undefined){
          if(Chatgroup.messages[this.state.dataKey[j]].value.text == "" && 
            Chatgroup.messages[this.state.dataKey[j]].value.sender == "0x0000000000000000000000000000000000000000")
            break;
        myData[j] = this.getAccountNumber(Chatgroup.messages[this.state.dataKey[j]].value.sender)+ " : " + 
                    Chatgroup.messages[this.state.dataKey[j]].value.text;  
      }
    }
  }
    var output = myData.map(item => <p>{item}</p>);
    
    return (
      <div style={chatStyle}>{ output }</div>
    );

  }
}

export default Read;

