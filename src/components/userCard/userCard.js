import React, {Component} from "react";
import './userCard.css';
import Button from "@material-ui/core/Button/Button";

export default class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user){
      return <div className='userCard'>
        <h1>
          <a href={this.props.user.html_url}>{this.props.user.login}</a>
        </h1>
        <img src={this.props.user.avatar_url} alt={this.props.user.login}/>
        <p>
          <a href="/usersList">
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
};
