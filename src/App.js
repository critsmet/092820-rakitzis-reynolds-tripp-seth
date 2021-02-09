import React from 'react';
import './App.css';

class App extends React.Component {

  state = {todo: '', todos: []}

  handleChange = (event) => {
    //the arrow function determines the 'this' keyword where it's define, in this case this arrow function is for an instance of the App component
    if (this.checkForCharacters(event.target.value)){
      this.setState({todo: event.target.value})
    }
  }

  checkForCharacters(string){
    return string.includes("0") ? false : true
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState((upToDateState) => ({todos: [...upToDateState.todos, upToDateState.todo], todo: ''}), () => console.log(this.state))
  }

  listTodos(){
    let todos = this.state.todos
    return todos.map(todo => <li key={todo}>{todo}</li>)
  }

  render(){
    return(
      <div className="App">
        <div id="todo-form-container">
          <form onSubmit={this.handleSubmit} id="todo-form">
            <input onChange={this.handleChange} name="todo" type="text" value={this.state.todo}/>
            <input type="submit" value="Add Todo!" />
          </form>
        </div>
        <div id="todos-container">
          <h2>Todos Go Here</h2>
          <ul id="todo-list">
            {this.listTodos()}
          </ul>
        </div>
      </div>
    )
  }
}


export default App;
