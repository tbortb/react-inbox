import './App.css';
import { Component } from 'react';
import Toolbar from './Toolbar';
import Messages from './Messages';
import { getAllEmails, addOneEmail, updateOneEmail } from './ApiCommunication'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  async componentDidMount() {
    const messages = await getAllEmails();
    this.setState({ messages });
  }

  updateOneMail = async (changeItem) => {
    console.log({ updateInput: changeItem })
    //changes in selection dont go to the server
    if (changeItem.command === "selected") {
      this.changeSelectState(changeItem);
    } else {
      //all other changes go to the server
      this.updateOnServerAndState(changeItem);
    }
  }

  updateOnServerAndState = async changeItem => {
    const updatedItems = await updateOneEmail(changeItem);
      console.log({ response: updatedItems });
      //Take selected status from prevState, because it is not saved on the server
      this.setState(prevState => ({
        messages:
        updatedItems.map(ui => ({ ...ui, selected: prevState.messages.find(pm => pm.id === ui.id).selected })
          )
      }));
  }

  changeSelectState = changeItem => {
    this.setState(prevState => ({
      messages: prevState.messages.map(pm =>
        changeItem.messageIds.includes(pm.id) ? { ...pm, selected: changeItem.selected } : pm
      )
    }))
  }

  render = () => {
    return (
      <div className="App">
        <Toolbar messages={this.state.messages} updateItem={this.updateOneMail} />
        <Messages messages={this.state.messages} updateItem={this.updateOneMail} />
      </div>
    );
  }
}

export default App;
