import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class Player1 extends Component {
  render() {
    return (
      <Wrapper className="App">
        <h1>I'm Player Uno!</h1>
      </Wrapper>
    );
  }
}

export default Player1;

const Wrapper = styled.div`
  flex: 1;
  background-color: red;
`;
