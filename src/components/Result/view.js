import React, { Component } from 'react';
import './style.css';

class Result extends Component {
  render () {
    if(this.props.data.length===0){
      return null;
    }
    const resultList = this.props.data.map(result => {
      return (
        <div className="column">
          <div className="ui segment">
            <h4 className="ui header">
              <i className="ui code"></i>
              <div className="content">
                {result.title}
              </div>
            </h4>
            <div className="ui basic segment code-segment">
              <div className="ui top right attached label">{result.language}</div>
              <div className="ui top left attached label">{result.compiler_status}</div>
              <pre className="code-section">
                {result.source_code}
              </pre>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="ui one column grid">
        {resultList}
      </div>
    );
  }
}

export default Result;
