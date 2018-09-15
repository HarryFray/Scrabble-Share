import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class ScoreBoard extends Component {
  render() {
    return (
      <Wrapper className="App">
        <h1>Both of you can see me!</h1>
      </Wrapper>
    );
  }
}

export default ScoreBoard;

const Wrapper = styled.div`
  flex: 1;
  background-color: white;
`;
