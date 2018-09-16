import React, { Component } from 'react';
import './App.css';
import Player1 from './Player1';
import Player2 from './Player2';

import ScoreBoard from './ScoreBoard';
import styled from 'styled-components';
import { database } from '../utils/firebase';
import { generateRandomLetters } from '../utils/gameLogic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60,
      currentGameId: '',
      isPlayer1: true
    };

    this.timerRef = database.ref('/time');
  }
  componentDidMount() {
    let url = window.location.href;
    if (url.includes('game')) {
      this.setState({
        isPlayer1: false,
        currentGameId: url.slice(url.indexOf('game') + 5)
      });
    }
  }

  handleCreateNewGame() {
    let letters = generateRandomLetters();
    let key = letters.join('').toLowerCase();
    database
      .ref()
      .child('/games')
      .child(key)
      .push(letters);

    this.setState({ currentGameId: key });
  }

  handleStartTimer() {
    this.timerRef.set(60);
    var countdown = setInterval(() => {
      this.timerRef.once('value', time => {
        let newTime = time.val() - 1;
        this.timerRef.set(newTime);
      });
      if (this.state.time === 0) {
        clearInterval(countdown);
        this.timerRef.set(60);
        this.setState({
          time: 'GAME OVER'
        });
      }
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Scrabble</h1>
          <h2>{this.state.time}</h2>
          <h2>{this.state.currentGameId.toUpperCase()}</h2>
        </header>
        <button onClick={this.handleCreateNewGame.bind(this)}>
          test button
        </button>
        <Content>
          {this.state.isPlayer1 ? (
            <Player1 currentGameId={this.state.currentGameId} />
          ) : (
            <Player2 />
          )}
          <ScoreBoard />
        </Content>
      </div>
    );
  }
}

export default App;

const Content = styled.div`
  display: flex;
  flex-direction: coulumn;
  height: 100vh;
`;
