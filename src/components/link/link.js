import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './link.css';

class TriggerPath extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Link to={`git10bestUsers/`}>
        <div className={"container"}>
          <div>
            <img className={"imagePlace"}  src={this.props.path.user.avatar_url} alt={this.props.path.user.avatar_url}/>
          </div>
          <div>
            <h5 className={"namePlace"}>{this.props.path.user.name}</h5>
          </div>
          <div>
            <p className={"detailsPlace"}>location: {this.props.path.user.location}</p>
            <p className={"detailsPlace"}>bio: {this.props.path.user.bio}</p>
            <p className={"detailsPlace"}>followers: {this.props.path.user.followers}</p>
            <p className={"detailsPlace"}>public_repos: {this.props.path.user.public_repos}</p>

          </div>

        </div>
      </Link>
    );
  }
}

export default TriggerPath;
