import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './link.css';

class TriggerPath extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={this.props.path.url}>
        <div className={"container"}>
          <div>
            <img className={"imagePlace"}  src={this.props.path.user.avatar_url} alt={this.props.path.user.avatar_url}/>
          </div>
          <div>
            <h1 className={"loginPlace"}>{this.props.path.user.login}</h1>
          </div>
        </div>
      </Link>
    );
  }
}

export default TriggerPath;
