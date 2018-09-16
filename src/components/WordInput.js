import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class WordInput extends Component {
  handleEnter(e) {
    if (e.key === 'Enter') {
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
