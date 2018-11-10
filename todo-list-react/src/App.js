import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List'
import Modal from './components/Modal'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {lists: [{id: 0, name: 'Done', cards: [{id: 0, title: "Xem phim"}, {id: 1, title: "Choi game"}]},
        {id: 1, name: 'Doing', cards: [{id: 2, title: "Hoc bai"}, {id: 3, title: "Coding"}]},
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
            rows.push(<List key={list.id} list = {list} newCard={this.newCard}/>)
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
    newCard = (id, title) => {
        let {lists, cardcode} = this.state;
        let index = lists.findIndex((val)=> {
            return val.id === id;
        });
        lists[index].cards.push({id: cardcode, title: title});
        cardcode++;
        this.setState({lists, cardcode});
    }
}

export default App;
