import React, {Component} from 'react';
import './modal.css';
class Modal extends Component {
	render() {
		return (<div className="modal">
			<div className="addlist">
				<input type="text" id="listname" autofocus="true" placeholder="Type new list title ..." />
				<button class="btn" onclick="createNew()">OK</button>
			</div>
			</div>);
	}
}

export default Modal;