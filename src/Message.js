import { Component } from 'react';

const Message = props => {

    console.log({Ort: "Message", props: props});
    //Why can I not put these in the component did mount method?
    //Why do only stateless components rerender on props changed?
    const read = props.message.read ? "read" : "unread";
    const starred = props.message.starred ? "fa-star" : "fa-star-o";
    const selected = props.message.selected ? "selected" : "";
    const checked = props.message.selected ? "checked" : "";
    // console.log(this.props.message.starred ? "fa-star" : "fa-star-o");
    

    let update = e => {
        let target = e.target.dataset.attribute;
        let value = !props.message[target];
        
        console.log(`Changed ${target} from ${props.message[target]} to ${value}`)

        let updatedItem = {...props.message, [target]: value};
        console.log(updatedItem);
        props.updateItem(updatedItem)
    }

    
        return <div className={"row message " + read + " " + selected}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox"
                            data-attribute="selected"
                            defaultChecked={checked} onChange={update}/>
                    </div>
                    <div className="col-xs-2">
                        <i className={"star fa " + starred}
                        data-attribute="starred"
                        onClick={update}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {props.message.labels.map((label, i) => <span key={i}
                    className="label label-warning">{label}
                </span>)}
                <a href="#">
                    {props.message.subject}
                </a>
            </div>
        </div>

    
}

export default Message