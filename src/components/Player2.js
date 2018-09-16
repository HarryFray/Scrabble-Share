import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import WordInput from './WordInput';

class Player2 extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  handleReady() {
    this.setState({ isReady: true });
  }
  render() {
    return (
      <Wrapper className="App">
        {!this.state.isReady && (
          <button onClick={this.handleReady.bind(this)}>I'm Ready!</button>
        )}
        {this.state.isReady && <WordInput />}
      </Wrapper>
    );
  }
}

export default Player2;

const Wrapper = styled.div`
  flex: 1;
  background-color: green;
`;
