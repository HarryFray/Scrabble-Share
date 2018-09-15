import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class Player2 extends Component {
  render() {
    return (
      <Wrapper className="App">
        <h1>I'm Player Dos!</h1>
      </Wrapper>
    );
  }
}

export default Player2;

const Wrapper = styled.div`
  flex: 1;
  background-color: green;
`;
