import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Categories from './components/Categories.jsx';
import Rewards from './components/Rewards.jsx';
import initialState from './initialState.jsx';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        categories: [],
        categoriesRewards: [],
        isLoading: false,
        rewards: [],
        view: 'rewards'
      }
      this.changeView = this.changeView.bind(this);
      this.getCategories = this.getCategories.bind(this);
      this.getCategoriesRewards = this.getCategoriesRewards.bind(this);
      this.getRewards = this.getRewards.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
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
            this.setState({
                rewards: rewardsData
            });
        })
    }

    getCategories() {
        axios.get(`/api/categories`)
            .then((data) => {
                let categoriesData = data.data;
                this.setState({
                    categories: categoriesData
                });
            })
    }

    getCategoriesRewards() {
        axios.get(`/api/categories_rewards`)
            .then((data) => {
                let categoriesRewardsData = data.data;

                categoriesRewardsData.sort((a, b) => {
                    return a.rewardId - b.rewardId;
                })

                console.log(categoriesRewardsData, 'logging categoriesRewardsData');

                let categoriesRewardsMatrix = [];

                for (var i = 0; i < 5; i++) {
                    let array = [0,0,0,0,0];
                    categoriesRewardsMatrix.push(array);
                }

                for (var j = 0; j < categoriesRewardsData.length; j++) {
                    let rewardIdArrayIndex = categoriesRewardsData[j].rewardId - 1;
                    let categoryArrayIndex = categoriesRewardsData[j].categoryId - 1;
                    categoriesRewardsMatrix[rewardIdArrayIndex][categoryArrayIndex] = 1;
                }

                console.log(categoriesRewardsMatrix, 'logging matrix');

                this.setState({
                    categoriesRewards: categoriesRewardsMatrix
                })
            })
    }

    handleRemove(rewardId, categoryId) {
        // pass in categoryId && rewardId

        let deleteData = {
            categoryId: categoryId,
            rewardId: rewardId
        }

        console.log(deleteData, 'line 98')

        // axios.delete(`/api/categories_rewards`, deleteData)

        axios({method: 'delete', url: `/api/categories_rewards`, data: deleteData})
            .then((res) => {
                console.log('successful DELETE request', res)
                this.getCategoriesRewards();
            })
            .catch(err => console.log(err, 'error from axios.delete'));

        
    }

    onDragOver(e) {
        e.preventDefault();
        console.log('reached onDragOver');
    }

    onDragStart(e, id, rewardName, categoryId) {
        console.log('onDragStart Id:', id);
        console.log('onDragStart columnId:', categoryId);
        e.dataTransfer.setData("id", id);
        e.dataTransfer.setData("rewardName", rewardName);
        e.dataTransfer.setData("dragStartCategoryId", categoryId);
    }

    onDrop(e, dropCategory, dragStartCategory) {
        console.log('reached onDrop');

        // this is the rewardName;
        let rewardName = e.dataTransfer.getData("rewardName");

        // this is the rewardCategory;
        let id = e.dataTransfer.getData("id");

        // dropCategory is the category
        let dropData = {
            categoryId: dropCategory,
            rewardId: id
        }

        if (this.state.categoriesRewards[id - 1][dropCategory - 1] !== 1) {
             // POST request here (if it did not already exist);
            axios.post(`api/categorize`, dropData)
                .then((res) => {
                    console.log('successful POST request', res)
                    // this.setState({ categoriesRewards: dropData});
                    this.getCategoriesRewards();
                })
                .catch(err => console.log(err, 'error from axios.post'));
        } else { 
            console.log('already exists!')
            alert("This reward is already categorized with this category!");
            return;
        }

        // check to see if onDragStart dragged from existing category
        let dragStartCategoryId = e.dataTransfer.getData("dragStartCategoryId");

        let deleteData = {
            categoryId: dragStartCategoryId,
            rewardId: id
        }

        if (dragStartCategoryId >= 1) {

            // DELETE request;
            axios({method: 'delete', url: `/api/categories_rewards`, data: deleteData})
            .then((res) => {
                console.log('successful DELETE request', res)
                this.getCategoriesRewards();
            })
            .catch(err => console.log(err, 'error from axios.delete'));
        }

    }
  
    renderView() {

    }

    componentDidMount() {
        this.getRewards();
        this.getCategories();
        this.getCategoriesRewards();
    }

    componentWillUnmount() {
    
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
              <Rewards rewards={this.state.rewards} categoriesRewards={this.state.categoriesRewards} onDragStart={this.onDragStart}/>

          </div>

 

          <div className="categories">
              Categories
              <hr />
              <Categories categories={this.state.categories} categoriesRewards={this.state.categoriesRewards} onDragStart={this.onDragStart} handleRemove={this.handleRemove} rewards={this.state.rewards} onDrop={this.onDrop} onDragOver={this.onDragOver}/>
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