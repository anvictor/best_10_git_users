import React, {Component} from "react";
import './loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className='loading'>
      <img src='https://agilenix.com/static/media/logo.c9946d3f.svg' alt="logo"/>
    </div>
  };
};




