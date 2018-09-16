import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import { checkIfWordInLetters } from '../utils/gameLogic';

class WordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usedWords: []
    };
  }

  handleEnterWord(e) {
    this.updateUsedWords();
    if (e.key === 'Enter') {
      let inputVal = this.input.value.toUpperCase();
      let { currentGameId } = this.props;
      if (
        checkIfWordInLetters(inputVal, currentGameId) &&
        !this.state.usedWords.includes(inputVal)
      ) {
        database
          .ref(`/${currentGameId}/words`)
          .push({ player: this.props.player, word: inputVal });
        this.input.value = '';
      }
    }
  }

  updateUsedWords() {
    database.ref(`/${this.props.currentGameId}/words`).on('value', snapshot => {
      if (snapshot.val()) {
        let existingWords = Object.values(snapshot.val()).map(
          word => word.word
        );
        this.setState({ usedWords: existingWords });
      }
    });
  }

  render() {
    return (
      <Wrapper className="App">
        <input
          type="text"
          placeholder="Word"
          ref={input => (this.input = input)}
          onKeyPress={this.handleEnterWord.bind(this)}
        />
      </Wrapper>
    );
  }
}

export default WordInput;

const Wrapper = styled.div`
  padding: 50px;
`;
