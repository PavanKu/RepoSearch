import React, { Component } from 'react';
import Header from '../header/view';
import Search from '../Search/view';
import Result from '../Result/view';
import Filter from '../Filter/view';
import Statistic from '../Statistic/view';

import db from '../../utils/db';
import './style.css';

class MainView extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query){
    console.log(query);
    db.search(query)
    .then(result => {
      this.setState({
        result: result
      });
    })
  }

  render () {
    return(
      <div className="ui grid">
        <div className="ui one column row">
          <div className="column">
            <Header></Header>
          </div>
        </div>
        <div className="ui two column row page-section">
          <div className="ui twelve wide column">
            <div className="ui one column grid">
              <div className="column">
                  <Search search={this.handleSearch}></Search>
              </div>
              <div className="column">
                <Result data={this.state.result}></Result>
              </div>
            </div>
          </div>
          <div className="ui four wide column">
            <Filter></Filter>
            <Statistic></Statistic>
          </div>
        </div>
      </div>
    );
  }
}

export default MainView;
