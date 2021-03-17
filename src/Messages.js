import { Component } from 'react';
import Message from './Message';

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                {this.props.messages.map((message, i) => <Message key={i}
                    message={message}
                    update={this.props.update} />)}
            </div>
        )
    }
}

export default Messages