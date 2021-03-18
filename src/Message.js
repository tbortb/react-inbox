import { Component } from 'react';

class Message extends Component {
    state = { read: null, starred: null, seleceted: null, checked: null };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            read: nextProps.message.read ? "read" : "unread",
            starred: nextProps.message.starred ? "fa-star" : "fa-star-o",
            selected: nextProps.message.selected ? "selected" : "",
            checked: nextProps.message.selected ? "checked" : "",
            labels: nextProps.message.labels
        }
    }

    update = e => {
        let target = e.target.dataset.attribute;
        let value = !this.props.message[target];
        let updatedItem = { ...this.props.message, [target]: value };
        this.props.updateItem(updatedItem)
    }

    render = () => {
        return <div className={"row message " + this.state.read + " " + this.state.selected}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox"
                            data-attribute="selected"
                            defaultChecked={this.state.checked} onChange={this.update} />
                    </div>
                    <div className="col-xs-2">
                        <i className={"star fa " + this.state.starred}
                            data-attribute="starred"
                            onClick={this.update}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {this.state.labels.map((label, i) => <span key={i}
                    className="label label-warning">{label}
                </span>)}
                <a href="#">
                    {this.props.message.subject}
                </a>
            </div>
        </div>
    }

}

export default Message