import Message from './Message';

const Messages = (props) => {
        return (
            <div>
                {props.messages.map(message => <Message key={message.id}
                    message={message}
                    updateItem={props.updateItem} />)}
            </div>
        )
}

export default Messages