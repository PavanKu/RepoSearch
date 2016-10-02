import React, { Component } from 'react'

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      query:''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSearch(evt){
    evt.preventDefault();
    this.props.search(this.state.query);
  }

  handleEdit(evt){
    const value = evt.target.value;
    this.setState({
      query: value
    });
  }

  render () {
    return(
      <form className="ui form" onSubmit={this.handleSearch}>
        <div className="ui fluid icon input">
          <input type="text" placeholder="Search by title, level or language..." onChange={this.handleEdit}/>
          <i className="search icon" />
        </div>
      </form>
    );
  }
}

export default Search;
