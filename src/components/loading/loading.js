import React, {Component} from "react";
import TriggerPath from '../link';
import './loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.handleAddConsumableClicked = this.handleAddConsumableClicked.bind(this);
  }

  render() {
    return <div className='loading'>
     Loading
    </div>
  };
};




