import React, { Component } from 'react';
import Header from '../header/view';
import MainView from '../MainView/view';
import db from '../../utils/db';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    //Pull data and push it to indexDB
    db.loadData()
    .then(res => {
      this.setState({
        isLoading: false
      });
    })
  }

  render() {
    return (
      <div>
        <Header sticky="yes"></Header>
        <MainView></MainView>
      </div>
    );
  }
}

export default App;
