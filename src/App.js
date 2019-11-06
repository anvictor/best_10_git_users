import React, {Component} from 'react';
import UserCard from './components/userCard/userCard';
import UsersList from "./components/usersList/usersList";
import './App.css';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {HashRouter, Redirect} from 'react-router-dom';
import {
  refreshUsersList,
  throwErrorMessage,
  hideErrorMessage,
} from './actions/UsersListActions';
import {
  refreshAndShowUserCard,
  hideUserCard,
} from './actions/UserCardActions';
import {
  showLoading,
  hideLoading
} from './actions/LoadingActions';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true};
    this.question = {
      head: "https://api.github.com/search/users?q=location%3A",
      middle: "+followers%3A%3E%3D",
      tail: "&type=Users"
    };
    this.location = "kiev";
    this.followers = "200";
  }

  componentDidMount(){
    return fetch(`${this.question.head}${this.location}${this.question.middle}${this.followers}${this.question.tail}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });
        console.log(this.state);
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){
    if(this.state.isLoading){
      return(
        <div className="App">
          <header className="App-header">
            <p>
              {"loading"}
            </p>

          </header>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {this.state.dataSource.items[3].login}
          </p>

        </header>
      </div>
    );
  }

}

const mapStateToProps = store => {
  return {store}
};
const mapDispatchToProps = dispatch => ({
  refreshUsersListDispatch: () => dispatch(refreshUsersList()),
  throwErrorMessageDispatch: () => dispatch(throwErrorMessage()),
  hideErrorMessageDispatch: () => dispatch(hideErrorMessage()),
  refreshAndShowUserCardDispatch: () => dispatch(refreshAndShowUserCard()),
  hideUserCardDispatch: () => dispatch(hideUserCard()),
  showLoadingDispatch: () => dispatch(showLoading()),
  hideLoadingDispatch: () => dispatch(hideLoading())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
