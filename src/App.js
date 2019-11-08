import React from 'react';
import UsersList from "./components/usersList/usersList";
import UserCard from "./components/userCard/userCard";
import Loading from "./components/loading/loading";
import Error from "./components/error/error";
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
    this.state = {
      isLoading: true,
      isErrorVisible: false
    };
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
          usersDetais: []
        }, function () {
          let localItems = [...this.state.dataSource.items];
          console.log('APP ****************************** localItems', localItems);
          for (let i =0; i<localItems.length;i++){

            fetch(localItems[i].url)
              .then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  usersDetais: [...this.state.usersDetais, responseJson],
                }, function () {
                  this.refreshUsersList(this.state.usersDetais);
                });
              })
              .catch((error) => {
                console.error(error);
                this.throwErrorMessage(error);
                this.setState({
                  isErrorVisible: true
                });
                setTimeout(()=>{
                  this.hideErrorMessage();
                  this.setState({
                    isErrorVisible: false
                  });
                },2000);
              });
          }

        });
      })
      .catch((error) => {
        console.error(error);
        this.throwErrorMessage(error);
        this.setState({
          isErrorVisible: true
        });
        setTimeout(()=>{
          this.hideErrorMessage();
          this.setState({
            isErrorVisible: false
          });
        },2000);
      });
  }

  render() {
    const usersList = this.props.store.usersList.usersList;
    const loading = this.props.store.loading;
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
        {this.state.isErrorVisible && <Error
          error = "error"
        />}

        <HashRouter>
            <Redirect from="/" exact to="/usersList"/>
            <Route path="/usersList"
                   render={() => this._usersListCall(
                     usersList,
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
    userCard
  ) {
    return <UsersList
      usersList={usersList}
      userCard = {userCard}
    />
  }

  _userCard(user) {
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
