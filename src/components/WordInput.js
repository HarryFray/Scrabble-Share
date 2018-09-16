import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import { checkIfWordInLetters } from '../utils/gameLogic';

class WordInput extends Component {
  constructor(props) {
    super(props);
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      database
        .ref(`/${this.props.currentGameId}/words`)
        .push({ player: this.props.player, word: this.input.value });
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
