import React, {Component} from "react";
import TriggerPath from '../link';
import './usersList.css';
import Button from "@material-ui/core/Button/Button";
import Badge from '@material-ui/core/Badge';
import Fab from "@material-ui/core/Fab/Fab";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className='usersList'>
      users List
      <TriggerPath path={{
        ...this.props.drinkState.path}}/>
    </div>
  };
};
