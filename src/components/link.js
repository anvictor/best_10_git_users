import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button/Button";
class TriggerPath extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Link to={this.props.path.url}>
        <Button variant="contained" color={'primary'}>
          {this.props.path.caption}
        </Button>
      </Link>
    );
  }
}

export default TriggerPath;
