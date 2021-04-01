import { Component } from 'react';

class ComposeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            body: ""
        }
    }

    updateNewMessage = e => {
        this.setState(prevState => ({
            [e.target.dataset.target]: e.target.value
        }))
    }

    submit = e => {
        this.props.addFunc({
            subject: this.state.subject,
            body: this.state.body
        });
        //clear state
        this.setState(prevState => ({ subject: "", body: "" }))
    }

    render() {
        return <form className="form-horizontal well" onSubmit={this.submit}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" data-target="subject"
                        placeholder="Enter a subject" name="subject" onChange={this.updateNewMessage}>
                    </input>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" data-target="body"
                        className="form-control" onChange={this.updateNewMessage}></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary">
                    </input>
                </div>
            </div>
        </form>
    }
}

export default ComposeForm