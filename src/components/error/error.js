import React, {Component} from "react";
import './error.css';

export default class Error extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div  className='error'>
      <h1>
        ERROR MESSAGE
      </h1>
      <p>
        {this.props.error}
      </p>
    </div>
  };
};




