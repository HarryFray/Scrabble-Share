import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import map from 'lodash/map';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Words: [],
      player2Words: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      database
        .ref(`/${this.props.currentGameId}/words`)
        .on('value', snapshot => {
          let allWords = [];
          map(snapshot.val(), (word, key) => {
            allWords.push(word);
          });
          this.setState({ player1Words: allWords });
        });
    }
  }

  render() {
    return (
      <Wrapper className="App">
        <WordList>
          {this.state.player1Words.map(word => {
            return <li>{`${word.player}: ${word.word}`}</li>;
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
