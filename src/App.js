import React from 'react';
import './App.css';

let url = "https://www.googleapis.com/books/v1/volumes?q="

class App extends React.Component {

  state = {volumes: [], alphabetize: false}

  submitBookSearch = (event) => {
    event.preventDefault()
    let query = event.target.term.value
    // this.setState({query}, () => console.log(this.state))
    fetch(url + query)
      .then(res => res.json())
      .then(respObj => {
        this.setState({volumes: respObj.items.map(volume => volume.volumeInfo.title)}, () => console.log(this.state))
      })
    event.target.reset()
  }

  toggleAlphabetize = (event) => {
    this.setState(prevState => ({alphabetize: !prevState.alphabetize}), () => console.log(this.state))
  }

  renderBooks = () => {
    if (this.state.alphabetize){
      return [...this.state.volumes].sort().map(book => <li key={book}>{book}</li>)
    } else {
      return this.state.volumes.map(book => <li key={book}>{book}</li>)
    }
  }

  render(){
    return(
      <div className="App">
        <form onSubmit={this.submitBookSearch}>
          <input type="text" name="term" />
          <input type="submit" value="Search for Books!" />
        </form>
        <br/>
        <div id="books-container">
          <input onChange={this.toggleAlphabetize} type="checkbox" name="sort"/>
          <label>Sort Alphabetically</label>
          <p>{this.state.alphabetize ? "TRUE" : "FALSE"}</p>
          <ul>
            {this.renderBooks()}
          </ul>
        </div>
      </div>
    )
  }
}


export default App;
