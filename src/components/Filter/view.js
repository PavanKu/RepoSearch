import React, { Component } from 'react'
import './style.css';

class Filter extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    const el = evt.target;
    this.props.onFilter(el.getAttribute('data'), el.checked);
  }

  render () {
    return(
      <div className="ui one column grid">
        <div className="column">
          <h4 className="ui header">
            <i className="ui filter icon"></i>
            <div className="content">Filter</div>
          </h4>
          <div className="ui divider"></div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option1" data="Accepted" onChange={this.handleChange}/>
            <label>
              Accepted
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option2" data="Skipped" onChange={this.handleChange}/>
            <label>
              Skipped
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option3" data="Time limit exceeded" onChange={this.handleChange}/>
            <label>
              Memory / Time limit exceeded
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option4" data="Compilation error" onChange={this.handleChange}/>
            <label>
              Runtime / Compilation error
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option5" data="Wrong answer" onChange={this.handleChange}/>
            <label>
              Wrong answer
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
