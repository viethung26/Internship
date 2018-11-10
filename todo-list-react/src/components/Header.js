import React, {Component} from 'react';
import './header.css';
class Header extends Component {
	render() {
		return (<div className="header">
			<h3><icon class="far fa-calendar-check"></icon> To-Do list</h3>
			<button class="btnadd btn" onclick="showModal()"><icon class="fa fa-plus-square"></icon></button>
		</div>);
	}
}

export default Header;