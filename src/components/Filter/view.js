import React, { Component } from 'react'
import './style.css';

class Filter extends Component {
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
            <input type="checkbox" name="option1" />
            <label>
              Accepted
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option2" />
            <label>
              Skipped
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option3" />
            <label>
              Memory / Time limit exceeded
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option4" />
            <label>
              Runtime / Compilation error
            </label>
          </div>
        </div>
        <div className="column">
          <div className="ui checkbox">
            <input type="checkbox" name="option5" />
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
