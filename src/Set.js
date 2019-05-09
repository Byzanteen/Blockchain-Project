import React from "react";

class Set extends React.Component {
  state = { 
        message: null,
        account: null
    };

    targets = {message: null, account: null};

    handleChange (event) {
        debugger;
       // this.setState({ [event.target.name]: event.target.value} );
       this.targets[event.target.name] = event.target;
       this.state[event.target.name]=event.target.value;
    }

  handleKeyDown = e => {
      debugger;
      if (e.keyCode === 13 || e.type === "click"){
        this.setValue(this.state.message,this.state.account);
    
        //cleanup
        this.targets.message.value = null;
        this.targets.account.value = null;

        this.state.message = null;
        this.state.account = null;
    }

};

  setValue = (value,account) => {
      debugger;
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Chatgroup;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["sendMessage"].cacheSend(value, {
      from: drizzleState.accounts[account]
    });

    // // save the `stackId` for later reference
    // this.setState({stackId: stackId });
  };

//   getTxStatus = () => {
//     // get the transaction states from the drizzle state
//     const { transactions, transactionStack } = this.props.drizzleState;

//     // get the transaction hash using our saved `stackId`
//     const txHash = transactionStack[this.state.stackId];

//     // if transaction hash does not exist, don't display anything
//     if (!txHash) return null;

//     // otherwise, return the transaction status
//     return "Sent!";
//   };

  render() {
    return (
      <div>
        <input type="text" name='message' onChange={event => this.handleChange(event)} onKeyDown={this.handleKeyDown}/>
        <input type="number" name='account' min="0" max="9" onChange={event => this.handleChange(event)}  onKeyDown={this.handleKeyDown}/>
        <button onClick={e => this.handleKeyDown(e)}>Send</button>
      </div>
    );
  }
}

export default Set;
