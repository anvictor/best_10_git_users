import React from 'react';
import './App.css';

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

export default App;
