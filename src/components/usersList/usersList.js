import React from "react";
import TriggerPath from '../link/link';
import './usersList.css';

function UsersList(props){
  const {usersList, userCard} = props;
    return <div className='usersList'>
      <ul>{usersList.map(user =>
        <li className={"userItem"} key={user.id} onClick={()=> userCard(user)} >
          <TriggerPath path={{url: `/user/${user.login}`, user: user}} >
          </TriggerPath>
        </li>)}
      </ul>

    </div>
};
export default UsersList;
