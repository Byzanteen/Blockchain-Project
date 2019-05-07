import React from "react";

class Read extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Chatgroup;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["p1"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { Chatgroup } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myData = Chatgroup.p1[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myData && myData.value}</p>;
    // return <p>My stored string: {this.state.dataKey.length}</p>;
  }
}

export default Read;

