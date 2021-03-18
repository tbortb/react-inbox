import './App.css';
import { Component } from 'react';
import Toolbar from './Toolbar';
import Messages from './Messages';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {messages : []};
  }


  async componentDidMount() {
    console.log("asd");
    const fetched = await fetch('http://localhost:8082/api/messages');
    const messages = await fetched.json();
    this.setState({ messages });
  }

  updateOneMail = (updateItem) => {
    this.setState(prevState => ({
      messages:
        prevState.messages.map(pm => pm.id === updateItem.id ? updateItem : pm)
    }));
  }

  deleteOneMail = (deleteItem) => {
    this.setState(prevState => ({
      messages: prevState.messages.filter(pm => pm.id !== deleteItem.id)
    }))
  }

  render = () => {
    return (
      <div className="App">
        <Toolbar messages={this.state.messages} updateItem={this.updateOneMail} deleteItem={this.deleteOneMail} />
        <Messages messages={this.state.messages} updateItem={this.updateOneMail} />
      </div>
    );
  }
}

export default App;
