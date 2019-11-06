import React, {Component} from "react";
import TriggerPath from '../link';
import './usersList.css';
import Button from "@material-ui/core/Button/Button";
import Badge from '@material-ui/core/Badge';
import Fab from "@material-ui/core/Fab/Fab";
import index from "../../reducers";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('usersList ****************************** this.props.usersList', this.props.usersList);
    return <div className='usersList'>
      <ul>{this.props.usersList.map(user => <li key={user.id}>
        <img src={user.avatar_url} alt={user.avatar_url}/>
        </li>)}</ul>
      <TriggerPath path={{
        ...this.props.path
      }}/>
    </div>
  };
};
