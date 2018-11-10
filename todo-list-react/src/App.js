import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List'
import Modal from './components/Modal'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {lists: [{id: 0, name: 'Done', cards: [{id: 0, title: "Xem phim"}]}]
        };
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    
                </div>
                <Modal/>
          
            </div>
        );
  }
}

export default App;
