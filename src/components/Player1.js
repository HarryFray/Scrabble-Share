import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import WordInput from './WordInput';

class Player1 extends Component {
  render() {
    const {
      currentGameId,
      createNewGame,
      startTimer,
      gameInSession
    } = this.props;
    return (
      <Wrapper className="App">
        <h3>PLAYER UNO</h3>
        <button onClick={createNewGame.bind(this)}>Creat New Game</button>
        <button onClick={startTimer.bind(this)}>Start Game</button>
        <h3>
          {currentGameId &&
            `Player2 URL: ${window.location.href}game/${currentGameId}`}
        </h3>
        {gameInSession && (
          <WordInput player="Player1" currentGameId={currentGameId} />
        )}
      </Wrapper>
    );
  }
}

export default Player1;

const Wrapper = styled.div`
  flex: 1;
  background-color: red;
`;
