import React from "react";

class Read extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Chatgroup;

    // let drizzle know we want to watch the `myString` method
    let dataKey = [];
    for(var j = 0;j<100;j++){
      dataKey[j] = contract.methods["messages"].cacheCall(j);
    }
debugger;
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Chatgroup } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    let myData = [] ;
    let j = 0;
    debugger;

    if(this.state.dataKey !== null ){
    for(;j<100;j++){
        if (Chatgroup.messages[this.state.dataKey[j]] !== undefined){
          if(Chatgroup.messages[this.state.dataKey[j]].value.text == "" && 
            Chatgroup.messages[this.state.dataKey[j]].value.sender == "0x0000000000000000000000000000000000000000")
            break;
        myData[j] = Chatgroup.messages[this.state.dataKey[j]].value.sender+ " : " + 
                    Chatgroup.messages[this.state.dataKey[j]].value.text;  
      }
    }
  }
    var output = myData.map(item => <p>{item}</p>);
    
debugger;
    // if it exists, then we display its value
    return (
      <div>{ output }</div>
    )
    // return <p>My stored string: {this.state.dataKey.length}</p>;
  }
}

export default Read;

