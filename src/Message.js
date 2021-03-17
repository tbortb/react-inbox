import { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.read = this.props.message.read ? "read" : "unread";
        this.starred = this.props.message.starred ? "fa-star" : "fa-star-o";
        this.selected = this.props.message.selected ? "selected" : "";
    }


    render = () => {
        return <div class={"row message " + this.read + this.selected}>
            <div class="col-xs-1">
                <div class="row">
                    <div class="col-xs-2">
                        <input type="checkbox" data-attribute="selected" />
                    </div>
                    <div class="col-xs-2">
                        <i class={"star fa " + this.starred} data-attribute="starred"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-11">
                {this.props.message.labels.map((label, i) => <span key={i}
                    class="label label-warning">{label}
                </span>)}
                <a href="#">
                    {this.props.message.subject}
                </a>
            </div>
        </div>

    }
}

export default Message