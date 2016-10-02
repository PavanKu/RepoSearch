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
      filters:[],
      result: [],
      query:''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(value, flag){
    let filters = this.state.filters;
    if(flag){
      //Add
      filters.push(value);
    }else {
      //remove
      const index = filters.indexOf(value);
      filters.splice(index, 1);
    }
    if(this.state.query || filters.length > 0){
      db.search(this.state.query, this.state.filters)
      .then(result => {
        this.setState({
          result: result,
          filters: this.state.filters,
          query:this.state.query
        });
      });
    }
  }

  handleSearch(query){
    console.log(query);
    if(query || this.state.filters.length > 0){
      db.search(query, this.state.filters)
      .then(result => {
        this.setState({
          result: result,
          filters: this.state.filters,
          query:query
        });
      });
    }
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
            <Filter onFilter={this.handleFilter}></Filter>
            <Statistic></Statistic>
          </div>
        </div>
      </div>
    );
  }
}

export default MainView;
