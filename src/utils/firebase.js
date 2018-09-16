import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDy9mRq9FwWrdmnB_wVgEbXbGOmQtV0omk',
  authDomain: 'scrabble-share.firebaseapp.com',
  databaseURL: 'https://scrabble-share.firebaseio.com',
  projectId: 'scrabble-share',
  storageBucket: 'scrabble-share.appspot.com',
  messagingSenderId: '122926275444'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
