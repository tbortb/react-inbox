import { Component } from 'react';

const noSelectedMailsClass = "fa-square-o";
const someSelectedMailsClass = "fa-minus-square-o";
const allSelectedMailsClass = "fa-check-square-o";
const applyLabelDefault = "Apply label";
const removeLabelDefault = "Remove label";

class Toolbar extends Component {

    state = {
        selectedIconClass: "",
        disabled: "",
        unreadCount: 0
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const selectedNum = nextProps.messages.filter(m => m.selected).length;
        const messagesCount = nextProps.messages.length;
        const selectedIconClass = selectedNum > 0 ?
            messagesCount === selectedNum ?
                allSelectedMailsClass :
                someSelectedMailsClass
            : noSelectedMailsClass;
        const disabled = selectedNum > 0 ? "" : "disabled";
        const unreadCount = nextProps.messages.filter(m => !m.read).length;

        return {
            selectedIconClass, disabled, unreadCount
        }
    }

    updateSelection = e => {
        const setSelectedTo = this.state.selectedIconClass !== allSelectedMailsClass;
        const changeMessages = this.props.messages.filter(m => m.selected !== setSelectedTo);
        changeMessages.forEach(m => this.props.updateItem({ ...m, selected: setSelectedTo }));
    }

    updateReadStatus = e => {
        this.getSelected().forEach(m => {
            const updatedMessage = { ...m, [e.target.dataset.attribute]: e.target.value == "true" };
            this.props.updateItem(updatedMessage);
        })
    }

    addLabel = e => {
        const newLabel = e.target.value;
        if (newLabel === applyLabelDefault){
            return;
        }
        this.getSelected().forEach(m => {
            if (m.labels.includes(newLabel)){
                return;
            }
            const updatedMessage = { ...m, labels: [...m.labels, e.target.value] };
            this.props.updateItem(updatedMessage);
        })
    }
    
    removeLabel = e => {
        const removeLabel = e.target.value;
        this.getSelected().forEach(m => {
            const updatedMessage = { ...m, labels: m.labels.filter(l => l !== removeLabel) };
            this.props.updateItem(updatedMessage);
        })
    }

    deleteMessage = e => this.getSelected().forEach(m => this.props.deleteItem(m))

    getSelected = () => this.props.messages.filter(m => m.selected);

    render = () => <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{this.state.unreadCount}</span>
        unread message{this.state.unreadCount !== 1 ? "s" : ""}
      </p>

            <button className="btn btn-default">
                <i className={"fa " + this.state.selectedIconClass}
                    onClick={this.updateSelection}></i>
            </button>

            <button className="btn btn-default"
                disabled={this.state.disabled}
                data-attribute="read"
                value="true"
                onClick={this.updateReadStatus}>
                Mark As Read
      </button>

            <button className="btn btn-default"
                disabled={this.state.disabled}
                data-attribute="read"
                value="false"
                onClick={this.updateReadStatus}>
                Mark As Unread
      </button>

            <select className="form-control label-select"
            disabled={this.state.disabled}
            onChange={this.addLabel}>
                <option>{applyLabelDefault}</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select"
            disabled={this.state.disabled}
            onChange={this.removeLabel}>
                <option>{removeLabelDefault}</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" disabled={this.state.disabled}
            onClick={this.deleteMessage}>
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
}

export default Toolbar