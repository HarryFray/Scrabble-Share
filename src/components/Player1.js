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
      gameInSession,
      player2Ready
    } = this.props;

    if (player2Ready) {
      alert('PLAYER DOS IS READY');
    }

    return (
      <Wrapper className="App">
        <h3>PLAYER UNO</h3>
        {currentGameId === '' ? (
          <button onClick={createNewGame.bind(this)}>Creat New Game</button>
        ) : (
          !gameInSession &&
          player2Ready && (
            <button onClick={startTimer.bind(this)}>Start Game</button>
          )
        )}
        {!gameInSession &&
          currentGameId && (
            <h3>
              {`SHARE URL WITH PLAYER DOS: ${
                window.location.href
              }game/${currentGameId}`}
            </h3>
          )}
        {gameInSession &&
          currentGameId && (
            <WordInput player="Player1" currentGameId={currentGameId} />
          )}
      </Wrapper>
    );
  }
}

export default Player1;

const Wrapper = styled.div`
  flex: 1;
  background-color: green;
`;
