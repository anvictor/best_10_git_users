import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './link.css';

class TriggerPath extends Component {
  constructor(props) {
    super(props);
    this.body = ()=>{return <div className={"container"}>
        {props.path.name}
      </div>
    };
    this.goodPath = props.path.name.replace(/\s/g,'_');
  }

  render() {

    return (
      <Link to={this.goodPath}>
        {this.body()}
      </Link>
    );
  }
}

export default TriggerPath;
