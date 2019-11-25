import React from "react";
import './userCard.css';
import Button from "@material-ui/core/Button/Button";

function UserCard(props){
    if (props.user){
      const {user:{html_url: html = '',
        avatar_url: avatar = '',
        login = ''}} = props;
      return <div className='userCard'>
        <h1>
          <a href={html}>{login}</a>
        </h1>
        <img src={avatar} alt={login}/>
        <p>
          <a href="/git10bestUsers">
            <Button className='backBtn'
                    variant="contained" color='primary'>
              BACK
            </Button>
          </a>
        </p>
      </div>
    }
    return <div></div>
};
export default UserCard;
