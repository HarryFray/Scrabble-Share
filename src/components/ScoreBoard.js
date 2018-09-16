import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import map from 'lodash/map';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWords: [],
      player1Score: 0,
      player2Score: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      database
        .ref(`/${this.props.currentGameId}/words`)
        .on('value', snapshot => {
          let allWords = [];
          let player1Score = 0;
          let player2Score = 0;
          map(snapshot.val(), (word, key) => {
            allWords.push(word);
            word.player === 'Player1' ? player1Score++ : player2Score++;
          });
          this.setState({ allWords: allWords, player1Score, player2Score });
        });
    }
  }

  render() {
    return (
      <Wrapper className="App">
        <Scores>
          PLAYER SCORES
          <Score>{`UNO: ${this.state.player1Score}`}</Score>
          <Score>{`DOS: ${this.state.player2Score}`}</Score>
        </Scores>

        <WordList>
          {this.state.allWords.map(word => {
            return <li key={word.word}>{`${word.player}: ${word.word}`}</li>;
          })}
        </WordList>
      </Wrapper>
    );
  }
}

export default ScoreBoard;

const Wrapper = styled.div`
  flex: 1;
  background-color: white;
`;

const WordList = styled.ul``;

const Score = styled.div`
  padding: 5px;
`;
const Scores = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
