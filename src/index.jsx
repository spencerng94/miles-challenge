import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Categories from './components/Categories.jsx';
import Rewards from './components/Rewards.jsx';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        categories: [],
        rewards: [],
        view: 'rewards'
      }
      this.changeView = this.changeView.bind(this);
      this.getCategories = this.getCategories.bind(this);
      this.getRewards = this.getRewards.bind(this);
      this.onDragOver = this.onDragOver.bind(this);
      this.onDragStart = this.onDragStart.bind(this);
      this.onDrop = this.onDrop.bind(this);
    }
  
    changeView(option) {
      this.setState({
        view: option
      });
    }

    getRewards() {
        axios.get(`/api/rewards/`).then((data) => {
            let rewardsData = data.data;
            // console.log(rewardsData);
            this.setState({
                rewards: rewardsData
            });
        })
    }

    getCategories() {
        axios.get(`/api/categories`)
            .then((data) => {
                let categoriesData = data.data;
                console.log(categoriesData);
                this.setState({
                    categories: categoriesData
                });
            })
    }

    onDragOver(e) {
        e.preventDefault();
        console.log('reached onDragOver');
    }

    onDragStart(e, id) {
        console.log('onDragStart Id:', id);
        e.dataTransfer.setData("id", id);
    }

    onDrop(e, dropCategory) {
        console.log('reached onDrop');

        // this is the rewardCategory;
        let id = e.dataTransfer.getData("id");

        // dropCategory is the category

        let dropData = {
            categoryId: dropCategory,
            rewardId: id
        }

        // POST request here 

        console.log(dropData, 'logging dropData')

        axios.post(`api/categorize`, dropData)
            .then((res) => {
                console.log('successful POST request', res)
            })
            .catch(err => console.log(err, 'error from axios.post'));

    }
  
    renderView() {

    }

    componentDidMount() {
        this.getRewards();
        this.getCategories();
    }

    render() {
      return (
        <div>
          <div className="nav">
            <span className="logo"
              onClick={() => this.changeView('rewards')}>
              Rewards and Categories
            </span>
            <span className={this.state.view === 'rewards'
              ? 'nav-selected'
              : 'nav-unselected'}
              onClick={() => this.changeView('rewards')}>
              Save
            </span>
            <span className="nav-unselected">
              Undo
            </span>
          </div>

        <div className="flex-container">

          <div className="rewards">
              Rewards
              <hr />
              <Rewards rewards={this.state.rewards} onDragStart={this.onDragStart}/>

          </div>

 

          <div className="categories">
              Categories
              <hr />
              <Categories categories={this.state.categories} onDrop={this.onDrop} onDragOver={this.onDragOver}/>
          </div>

        </div>
          
  
          <div className="main">
            {this.renderView()}
          </div>
        </div>
      );
    }
  }
  
ReactDOM.render(<App />, document.getElementById('miles'));

// import { createStore } from "redux";

// const reducer = (state, action) => {
//     switch(action.type) {
//         case "ADD":
//             state = state + action.payload;
//             break;
//         case "SUBTRACT":
//             break;
//     }

//     return state;
// };

// const store = createStore(reducer, 1);

// store.subscribe(() => {
//     console.log("Store updated", store.getState());
// });

// store.dispatch({
//     type: "ADD",
//     payload: 10
// });