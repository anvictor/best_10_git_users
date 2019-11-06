import React, {Component} from "react";
import TriggerPath from '../link';
import './userCard.css';

export default class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleAddConsumableClicked = this.handleAddConsumableClicked.bind(this);
  }

  render() {
    return <div className='userCard'>
      user card
      <TriggerPath path={{...this.props.path}}/>
    </div>
  };
};




