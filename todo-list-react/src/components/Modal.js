import React, {Component} from 'react';
import './modal.css';
class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {text: ''};
	}
	render() {
		return (<div className="modal">
			<div className="addlist">
				<input type="text" id="listname" autoFocus={true} placeholder="Type new list title ..." value={this.state.text} 
				onChange={(event)=>this.setState({text: event.target.value})}/>
				<button className="btn" onClick={()=>this.props.newList(this.state.text.trim())}>OK <i className="fa fa-check-circle"></i></button>
				<button className="btn" onClick={()=>this.props.hideModal(false)}>Cancel <i className="fa fa-close"></i></button>
			</div>
			</div>);
	}
}

export default Modal;