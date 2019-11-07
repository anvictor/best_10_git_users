import React, {Component} from 'react';
import UsersList from "./components/usersList/usersList";
import UserCard from "./components/userCard/userCard";
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
  refreshUserCard
} from './actions/UserCardActions';


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
    this.refreshUserCard = this.props.refreshUserCardDispatch;
    this.refreshUsersList = this.props.refreshUsersListDispatch;
    this.throwErrorMessage = this.props.throwErrorMessageDispatch;
    this.hideErrorMessage = this.props.hideErrorMessageDispatch;

    this._userCard = this._userCard.bind(this);
  }

  componentDidMount() {
    return fetch(`${this.
      question.head}${this.
      location}${this.
      question.middle}${this.
      followers}${this.
      question.tail}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          let localItems = [...this.state.dataSource.items];
          this.refreshUsersList(localItems)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log('APP **************************** this.state', this.state);
    console.log('APP **************************** this.props', this.props);
    const usersList = this.props.store.usersList.usersList;
    const user = this.props.store.usersList.user;
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
                     isErrorVisible,
                     this._userCard
                   )}
            />

        </HashRouter>
        <UserCard
          user={this.state.user}
        />
      </div>
    );
  }

  _usersListCall(
    usersList,
    isErrorVisible,
    userCard
  ) {
    return <UsersList
      usersList={usersList}
      isErrorVisible={isErrorVisible}
      userCard = {userCard}
    />
  }

  _userCard(user) {
    console.log('event click on user**********************user',user);

    this.refreshUserCard(user);
    this.setState({
      user: user
    });
    return <UserCard
      user={user}
    />
  }
}

const mapStateToProps = store => {
  return {store}
};
const mapDispatchToProps = dispatch => ({
  refreshUserCardDispatch: (user) => dispatch(refreshUserCard(user)),
  refreshUsersListDispatch: (usersArray) => dispatch(refreshUsersList(usersArray)),
  throwErrorMessageDispatch: () => dispatch(throwErrorMessage()),
  hideErrorMessageDispatch: () => dispatch(hideErrorMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);


// https://api.github.com/search/users?q=location%3Akiev+followers%3A%3E%3D200&type=Users
