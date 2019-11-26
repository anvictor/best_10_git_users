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
      isErrorVisible: false,
      usersList: []
    };
    this.question = {
      head: "https://api.github.com/search/users?q=location%3A",
      location: "kiev", // modify these request in the future if necessary
      middle: "+followers%3A%3E%3D",
      followers: "200", // modify these request in the future if necessary
      tail: "&type=Users"
    };
    this.refreshUserCard = this.props.refreshUserCardDispatch;
    this.refreshUsersList = this.props.refreshUsersListDispatch;
    this.throwErrorMessage = this.props.throwErrorMessageDispatch;
    this.hideErrorMessage = this.props.hideErrorMessageDispatch;
    this._userCard = this._userCard.bind(this);
  }

  async componentDidMount() {
    try {
    const {head, location, middle, followers, tail} = this.question;
    const poorList = await fetch(`${head}${location}${middle}${followers}${tail}`);
      if (poorList.status>200) {
        this.setState({
          errorMessage: `${poorList.status} ${poorList.statusText} too frequent requests.
           Restart later!`,
          isLoading: false,
          isErrorVisible: true
        });
        setTimeout(()=>{
          this.hideErrorMessage();
          this.setState({
            errorMessage: `Try to restart page now again!`,
          });
        },11000);
      }
    const poorJson = await poorList.json();
    let {items: poorPersons} = poorJson;
    let richPersons = [];
    for (let i = 0; i < poorPersons.length; i++) {
      const richPerson = await fetch(poorPersons[i].url);
      const richJson = await richPerson.json();
      richPersons[i] = {...richPersons[i], ...richJson}
    }

      this.setState({
      isLoading: false,
      usersList: richPersons
    });
    }catch(error){
      console.error(error);
      this.throwErrorMessage(`throwErrorMessage`);
      this.setState({
        errorMessage: `${error}  too frequent requests. Restart later!`,
        isErrorVisible: true
      });
      setTimeout(()=>{
        this.hideErrorMessage();
        this.setState({
          errorMessage: `Try to restart page now!`,
        });
      },10000);
    }
  }

  render() {
    const usersList = this.state.usersList;
    const loading = this.props.store.loading;
    if (this.state.isLoading) {
      return (
        <div className="App">
          <Loading
            loading={loading}
          />
        </div>
      )
    } else {
      return (
        <div className="App">
          {this.state.isErrorVisible && <Error
            error={this.state.errorMessage}
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
  }

  _usersListCall(
    usersList,
    userCard
  ) {
    return <UsersList
      usersList={usersList}
      userCard={userCard}
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
