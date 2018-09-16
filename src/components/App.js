import React, { Component } from 'react';
import './App.css';
import Player1 from './Player1';
import Player2 from './Player2';

import ScoreBoard from './ScoreBoard';
import styled from 'styled-components';
import { database } from '../utils/firebase';

import { Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60
    };

    this.timerRef = database.ref('/time');
  }
  componentDidMount() {
    database
      .ref()
      .child('/time')
      .on('value', snapshot => {
        this.setState({ time: snapshot.val() });
      });
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
        </header>
        <button onClick={this.handleStartTimer.bind(this)}>test timer</button>
        <Content>
          <Route exact path="/" component={Player1} />
          <Route exact path="/player2" component={Player2} />
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
