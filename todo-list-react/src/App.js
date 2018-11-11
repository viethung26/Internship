import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List'
import Modal from './components/Modal'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {lists: [{id: 0, name: 'Done', cards: [{listid: 0, id: 0, title: "Xem phim"}, {listid: 0, id: 1, title: "Choi game"}]},
        {id: 1, name: 'Doing', cards: [{listid: 1, id: 2, title: "Hoc bai"}, {listid: 1, id: 3, title: "Coding"}]},
        {id: 2, name: 'Checking', cards: []} ],
        isModalEnable: false,
        code: 3,
        cardcode: 4,
        };  
    }
    render() {
        return (
            <div>
                <Header showModal={this.toggleModal}/>
                <div className="container">
                    {this.loadList()}
                </div>
                {this.state.isModalEnable? <Modal hideModal={this.toggleModal} newList={this.newList}/> : ''}
            </div>
        );
    }
    toggleModal = (value) => {
        this.setState({isModalEnable: value});
    }
    loadList = () => {
        const {lists} = this.state;
        const rows = [];
        for(let list of lists) {
            rows.push(<List key={list.id} list={list} removeList={this.handleRemoveList}  newCard={this.newCard} handleMove={this.handleMove} removeCard={this.handleRemoveCard}/>)
        }
        return rows;
    }
    newList = (name) => {
        this.toggleModal(false);
        if(!name) return;
        let {lists, code} = this.state;
        let newList = {id: code, name: name, cards: []};
        lists.push(newList);
        code++;
        this.setState({lists,code});
    }
    handleRemoveList = (id) => {
        let {lists} = this.state;
        let index = lists.findIndex((val)=>{return id === val.id});
        lists.splice(index,1);
        this.setState({lists});
    }
    newCard = (id, title) => {
        let {lists, cardcode} = this.state;
        let index = lists.findIndex((val)=> {
            return val.id === id;
        });
        lists[index].cards.push({listid: lists[index].id, id: cardcode, title: title});
        cardcode++;
        this.setState({lists, cardcode});
    }
    handleMove = (cardid, listbefore, listafter) => {
        // find index listbefore
        let {lists} = this.state;
        let lBIndex = lists.findIndex((val) => { return val.id == listbefore});
        let lAIndex = lists.findIndex((val) => { return val.id == listafter});
        let cardIndex = lists[lBIndex].cards.findIndex((val)=> {return val.id == cardid});
        let card = lists[lBIndex].cards[cardIndex];
        card.listid = lists[lAIndex].id;
        lists[lAIndex].cards.push(card);
        lists[lBIndex].cards.splice(cardIndex,1);
        this.setState({lists});
    }
    handleRemoveCard = (card) => {
        let {lists} = this.state;
        let index = lists.findIndex((val)=>{return card.listid === val.id});
        let cardIndex = lists[index].cards.findIndex((val)=>{return card.id === val.id});
        lists[index].cards.splice(cardIndex,1);
        this.setState({lists});
    }
}

export default App;
