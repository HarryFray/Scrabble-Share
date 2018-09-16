import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import { checkIfWordInLetters } from '../utils/gameLogic';

class WordInput extends Component {
  constructor(props) {
    super(props);
    this.wordRef = database.ref(`/games/${this.props.currentGameId}`);
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      console.log(this.props.currentGameId);
      this.wordRef.push({ player: this.props.player, word: this.input.value });
      this.input.value = '';
    }
  }

  render() {
    return (
      <Wrapper className="App">
        <input
          type="text"
          placeholder="Word"
          ref={input => (this.input = input)}
          onKeyPress={this.handleEnter.bind(this)}
        />
      </Wrapper>
    );
  }
}

export default WordInput;

const Wrapper = styled.div`
  padding: 50px;
`;
