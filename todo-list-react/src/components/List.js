import React, {Component} from 'react';
import Card from './Card';
class List extends Component {
	constructor(props) {
		super(props);
		this.state = {name: ''};
	}
	render() {
		return (<div className="list">
			<div className='head'><h4>${this.props.list.name}</h4></div>
		</div>);
	}
}

export default List;