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
        const changeMessageIds = this.props.messages.filter(m => m.selected !== setSelectedTo).map(m => m.id);
        this.props.updateItem({ messageIds: changeMessageIds, command: "selected", selected: setSelectedTo })
    }

    updateValue = e => {
        this.props.updateItem({
            messageIds: this.props.messages.filter(m => m.selected).map(m => m.id),
            command: e.target.dataset.command,
            [e.target.dataset.attribute]: e.target.value
        })
    }

    

    render = () => <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{this.state.unreadCount}</span>
        unread message{this.state.unreadCount !== 1 ? "s" : ""}
            </p>

            <a className="btn btn-danger" onClick={this.props.toggleComposeForm}>
                <i className="fa fa-plus"></i>
            </a>

            <button className="btn btn-default" onClick={this.updateSelection}>
                <i className={"fa " + this.state.selectedIconClass}></i>
            </button>

            <button className="btn btn-default"
                disabled={this.state.disabled}
                data-command="read"
                data-attribute="read"
                value
                onClick={this.updateValue}>
                Mark As Read
            </button>

            <button className="btn btn-default"
                disabled={this.state.disabled}
                data-command="read"
                data-attribute="read"
                onClick={this.updateValue}>
                Mark As Unread
            </button>

            <select className="form-control label-select"
                data-command="addLabel"
                data-attribute="label"
                disabled={this.state.disabled}
                onChange={this.updateValue}>
                <option value="">{applyLabelDefault}</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select"
                data-command="removeLabel"
                data-attribute="label"
                disabled={this.state.disabled}
                onChange={this.updateValue}>
                <option value={applyLabelDefault}>{removeLabelDefault}</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default"
                disabled={this.state.disabled}
                data-command="delete"
                onClick={this.updateValue}>
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
}

export default Toolbar