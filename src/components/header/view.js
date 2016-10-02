import React, { Component } from 'react'
import './style.css';

class Header extends Component {
  render () {
    let headerClass = 'ui basic segment';
    if(this.props.sticky === 'yes'){
      headerClass = 'ui basic segment fixed top sticky top-header';
    }else {
      headerClass = 'ui basic segment';
    }

    return (
      <div className={headerClass}>
        <h3 className="ui header">
          <i className="code icon"></i>
          <div className="content">
            Code Cafe
            <div className="sub header">
              Code hub with stats...
            </div>
          </div>
        </h3>
      </div>
    );
  }
}

export default Header;
