import React, {Component} from 'react';
import './header.css';
class Header extends Component {
	render() {
		return (<div className="header">
			<h3><i className="far fa-calendar-check"></i> To-Do list</h3>
			<button className="btnadd btn" onClick={()=>this.props.showModal(true)}><i className="fa fa-plus-square"></i></button>
		</div>);
	}
}

export default Header;