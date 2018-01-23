import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Websocket from 'react-websocket';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.setState({response: data});
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    console.log('data',this.state.response);
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Florence is: {response[0].name} °F
            </p>
          : <p>Loading...</p>}
        {/* <Websocket url='ws://stocks.mnet.website'
              onMessage={this.handleData.bind(this)}/> */}
      </div>
    );
  }
}
export default App;