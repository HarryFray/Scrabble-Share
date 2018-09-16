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
      gameLetters: '',
      isPlayer1: true,
      gameInSession: false,
      player2Ready: false
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let gameId = url.slice(url.indexOf('game') + 5);
    if (url.includes('game')) {
      this.setState(
        {
          isPlayer1: false,
          currentGameId: gameId,
          gameLetters: gameId.toUpperCase()
        },
        () => {
          let gameRef = database.ref().child(`/${this.state.currentGameId}`);
          let timerRef = gameRef.child('/timer');
          gameRef.child('/gameInSession').on('value', gameInSession => {
            this.setState({ gameInSession: gameInSession.val() });
          });

          timerRef.on('value', time => {
            this.setState({ time: time.val() });
          });
        }
      );
    }
  }

  handleCreateNewGame() {
    // creates game in local state
    let letters = generateRandomLetters();
    let key = letters.join('').toLowerCase();
    database
      .ref()
      .child(key)
      .push(letters);
    this.setState({ currentGameId: key }, () => {
      // adds game to firebase and handles if player 2 is ready
      let gameRef = database.ref().child(`/${this.state.currentGameId}`);
      let player2ReadyRef = gameRef.child('/player2Ready');
      player2ReadyRef.set(false);
      player2ReadyRef.on('value', player2Ready => {
        this.setState({ player2Ready: player2Ready.val() });
      });
    });
  }

  handleStartTimer() {
    let gameRef = database.ref().child(`/${this.state.currentGameId}`);

    // sets game is session to true
    let gameInSessionRef = gameRef.child('/gameInSession');
    gameRef.child('/gameInSession').on('value', gameInSession => {
      this.setState({ gameInSession: gameInSession.val() });
    });
    gameInSessionRef.set(true);
    this.setState({ gameLetters: this.state.currentGameId.toUpperCase() });

    // creates and starts timer
    let timerRef = gameRef.child('/timer');
    timerRef.set(60);
    timerRef.on('value', time => {
      this.setState({ time: time.val() });
    });
    timerRef.set(60);
    var countdown = setInterval(() => {
      timerRef.once('value', time => {
        let newTime = time.val() - 1;
        timerRef.set(newTime);
        if (newTime === 0) {
          clearInterval(countdown);
          timerRef.set('GAME OVER');
          gameInSessionRef.set(false);
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Scrabble</h1>
          <h2>{this.state.time}</h2>
          {this.state.gameInSession && <h2>{this.state.gameLetters}</h2>}
        </header>
        <Content>
          {this.state.isPlayer1 ? (
            <Player1
              currentGameId={this.state.currentGameId}
              startTimer={this.handleStartTimer.bind(this)}
              createNewGame={this.handleCreateNewGame.bind(this)}
              gameInSession={this.state.gameInSession}
              player2Ready={this.state.player2Ready}
            />
          ) : (
            <Player2
              currentGameId={this.state.currentGameId}
              gameInSession={this.state.gameInSession}
            />
          )}
          <ScoreBoard currentGameId={this.state.currentGameId} />
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
