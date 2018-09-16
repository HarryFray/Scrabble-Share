import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class Player1 extends Component {
  render() {
    const { currentGameId } = this.props;
    return (
      <Wrapper className="App">
        <button>Creat New Game</button>
        <h1>I'm Player Uno!</h1>
        <h3>
          {currentGameId && `${window.location.href}game/${currentGameId}`}
        </h3>
      </Wrapper>
    );
  }
}

export default Player1;

const Wrapper = styled.div`
  flex: 1;
  background-color: red;
`;
