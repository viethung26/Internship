import React, {Component} from 'react';
import './list.css';
class List extends Component {
	constructor(props) {
		super(props);
		this.state = {isEnable: false, text: ''};
	}
	render() {
		return (<div className="list">
			<div className='listhead'><h4>{this.props.list.name}</h4></div>
			<div className="listcard">
				{this.loadCard()}
			</div>
			<div className="typearea">
				{this.state.isEnable ? <div>
					<input  type="text" autoFocus={true} placeholder={"Enter new card ..."} value={this.state.text} 
					onChange={(event)=>this.setState({text: event.target.value})}/>
					<button className="btn bordered" onClick={()=>this.handleNewCard()}>OK <i className="fa fa-check-circle"></i></button>
					<button className="btn bordered" onClick={()=>this.setState({isEnable: false})}>Cancel <i className="fa fa-close"></i></button>
				</div> : 
				<div><button className="btn" onClick={()=>this.setState({isEnable: true, text: ''})}><i className="fa fa-plus"></i> Add card</button></div>}
			</div>
		</div>);
	}
	loadCard = () => {
		const cards = this.props.list.cards;
		const rows = [];
		for(let card of cards) {
			rows.push(<div key={card.id} className="card" id={card.id} draggable={true}>{card.title}</div>)
		}
		return rows;
	}
	handleNewCard = () => {
		this.setState({isEnable: false});
		this.props.newCard(this.props.list.id, this.state.text.trim());
	}
}

export default List;