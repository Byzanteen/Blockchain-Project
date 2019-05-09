import React from "react";
import AccountNames from "./Constants"

class Set extends React.Component {
    state = {
        message: null,
        account: null
    };

    targets = { message: null, account: null };

    handleChange(event) {
        // this.setState({ [event.target.name]: event.target.value} );
        debugger;
        this.targets[event.target.name] = event.target;
        this.setState({ [event.target.name]: event.target.value });
    }

    handleKeyDown = e => {
        if (e.keyCode === 13 || e.type === "click") {
            if (this.state.message != null && this.state.account != null) {
                this.setValue(this.state.message, this.state.account);
                //cleanup
                this.targets.message.value = null;
                this.targets.account.value = null;
                this.setState({ message: null });
                this.setState({ account: null });
            }
        }

    };

    setValue = (value, account) => {
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
        const buttonStyles = {
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            //padding: 15px 32px,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            //margin: '4px 2px',
            cursor: 'pointer'
        }

    var options = AccountNames.map(item => <option value={item.index}>{item.name}</option>);

        return (
            <div>
                <input type="text" name='message' onChange={event => this.handleChange(event)} onKeyDown={this.handleKeyDown} />
                {/* <input type="number" name='account' min="1" max="10" onChange={event => this.handleChange(event)} onKeyDown={this.handleKeyDown} /> */}
                <select name='account' value={this.state.account} onKeyDown={this.handleKeyDown}  onChange={event => this.handleChange(event)}>
                    {options}
                </select>
                <button style={buttonStyles} onClick={e => this.handleKeyDown(e)}>Send</button>
            </div>
        );
    }
}

export default Set;
