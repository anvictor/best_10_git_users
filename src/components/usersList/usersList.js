import React, {Component} from "react";
import TriggerPath from '../link/link';
import './usersList.css';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('users List ********************* props', this.props);
    return <div className='usersList'>
      <ul>{this.props.usersList.map(user =>
        <li className={"userItem"} key={user.id} onClick={()=> this.props.userCard(user)} >
          <TriggerPath path={{url: `/user/${user.login}`, user: user}} >

          </TriggerPath>
        </li>)}
      </ul>

    </div>
  };
};
