import React, {Component} from 'react';
import UserCard from './components/userCard/userCard';
import UsersList from "./components/usersList/usersList";
import Loading from "./components/loading/loading";
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
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
    this.question = {
      head: "https://api.github.com/search/users?q=location%3A",
      middle: "+followers%3A%3E%3D",
      tail: "&type=Users"
    };
    this.location = "kiev";
    this.followers = "200";
    this.refreshUsersList = refreshUsersList;
    this.throwErrorMessage = throwErrorMessage;
    this.hideErrorMessage = hideErrorMessage;
    this.refreshAndShowUserCard = refreshAndShowUserCard;
    this.hideUserCard = hideUserCard;
    this.showLoading = showLoading;
    this.hideLoading = hideLoading;
  }

  componentDidMount() {
    console.log('APP **************************** this.props', this.props);

    return fetch(`${this.question.head}${this.location}${this.question.middle}${this.followers}${this.question.tail}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          let localItems = [...this.state.dataSource.items];
          this.refreshUsersList(localItems)
          console.log('response **********function************ function', localItems);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    this.refreshUsersList();
    const usersList = this.props.store.usersList.usersList;
    const userCard = this.props.store.userCard;
    const loading = this.props.store.loading;
    const isErrorVisible = this.props.isErrorVisible;
    if (this.state.isLoading) {
      return (
        <div className="App">
          <Loading
          loading = {loading}
          />
        </div>
      )
    }
    return (
      <div className="App">
        <HashRouter>
          <Redirect from="/" exact to="/usersList"/>
          <Route path="/usersList"
                 render={() => this._usersListCall(
                   usersList,
                   isErrorVisible
                 )}
          />
          <Route path="/userCard"
                 render={() => this._userCardCall(
                   userCard,
                 )}
          />
        </HashRouter>

        <h1 className="App-header">
          {this.state.dataSource.items[3].login}
        </h1>
      </div>
    );
  }

  _usersListCall(
    usersList,
    isErrorVisible
  ) {
    return <UsersList
      usersList={usersList}
      isErrorVisible={isErrorVisible}
    />
  }

  _userCardCall(
    userCard,
  ) {
    return <UserCard
      userCard={userCard}
    />
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
