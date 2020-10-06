import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Categories from './components/Categories.jsx';
import Loading from './components/Loading.jsx';
import Rewards from './components/Rewards.jsx';
import Save from './components/Save.jsx';
import UndoRedo from './components/UndoRedo.jsx';
import { saveState } from './redux/store/localStorage.js';
import { getRewards, getCategories, getCategoriesRewards, loadRewards } from './redux/actions/getActions.js';
import { postCategoryReward, deleteCategoryReward, undoCategoryReward } from './redux/actions/changeActions.js';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.onGetCategories = this.onGetCategories.bind(this);
      this.onGetCategoriesRewards = this.onGetCategoriesRewards.bind(this);
      this.onGetRewards = this.onGetRewards.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleUndo = this.handleUndo.bind(this);
      this.onDragOver = this.onDragOver.bind(this);
      this.onDragStart = this.onDragStart.bind(this);
      this.onDrop = this.onDrop.bind(this);
    }

    onGetRewards() {
      this.props.getRewards();
    }

    onGetCategories() {
      this.props.getCategories();
    }

    onGetCategoriesRewards() {
      this.props.getCategoriesRewards();
    }

    handleRemove(rewardId, categoryId) {
        let deleteData = {
            categoryId: categoryId,
            rewardId: rewardId
        }
        this.props.deleteCategoryReward(deleteData);
    }

    handleUndo(e, past) {
      e.preventDefault();
      past = this.props.past;
      this.props.undoCategoryReward(past);
    }

    handleSave(e) {
      e.preventDefault();
      saveState(this.props);
      alert('Saved to localStorage!');
    }

    onDragOver(e) {
        e.preventDefault();
        console.log('reached onDragOver');
    }

    onDragStart(e, id, rewardName, categoryId) {
        e.dataTransfer.setData("id", id);
        e.dataTransfer.setData("rewardName", rewardName);
        e.dataTransfer.setData("dragStartCategoryId", categoryId);
    }

    onDrop(e, dropCategory, dragStartCategory) {
        let rewardName = e.dataTransfer.getData("rewardName");
        let id = e.dataTransfer.getData("id");
        let dropData = {
            categoryId: dropCategory,
            rewardId: id
        }
        if (this.props.categoriesRewards[id - 1][dropCategory - 1] !== 1) {
            this.props.postCategoryReward(dropData);
        } else { 
            console.log('already exists!')
            alert("This reward is already categorized with this category!");
            return;
        }
        let dragStartCategoryId = e.dataTransfer.getData("dragStartCategoryId");
        let deleteData = {
            categoryId: dragStartCategoryId,
            rewardId: id
        }
        if (dragStartCategoryId >= 1) {
            this.props.deleteCategoryReward(deleteData);
        }
    }

    componentDidMount() {
        this.onGetRewards();
        this.onGetCategories();
        this.onGetCategoriesRewards();
    }
    
    render() {
      const { loadingReward, loadingCategory, loadingCategoryReward } = this.props;
      let rewardsContent;
      let categoriesContent;

      if (loadingReward === true || loadingReward === undefined || loadingCategory === true || loadingCategory === undefined || loadingCategoryReward === true || loadingCategoryReward === undefined) {
        console.log('it is loading');
        console.log(this.props, 'this.props');
        rewardsContent = (<Loading/>);
        categoriesContent = (<Loading/>);
      } else {
        rewardsContent = (<Rewards onDragStart={this.onDragStart} 
        rewards={this.props.rewards}/>);
        categoriesContent = (<Categories categories={this.props.categories} categoriesRewards={this.props.categoriesRewards} onDragStart={this.onDragStart} handleRemove={this.handleRemove} rewards={this.props.rewards} onDrop={this.onDrop} onDragOver={this.onDragOver} past={this.props.past}/>)
      }
      return (
        <div>
          <div className="nav">
            <span className="logo"
              onClick={() => this.changeView('rewards')}>
              Rewards and Categories
            </span>
              <Save handleSave={this.handleSave} state={this.props}/>
              <UndoRedo handleUndo={this.handleUndo} past={this.props.past}/>
          </div>

        <div className="flex-container">
          <div className="rewards">
            <div className="rewards-title">
              Rewards
            </div>
              <hr />
              <div>

              </div>
              {rewardsContent}
          </div>
          <div className="categories">
            <div className="categories-title">
              Categories
            </div>
              <hr />
              {categoriesContent}
          </div>

        </div> 
          <div className="main">
          </div>
        </div>
      );
    }
  }

const mapStateToProps = (state) => ({
  categories: state.categories,
  rewards: state.rewards,
  categoriesRewards: state.categoriesRewards,
  loadingReward: state.loadingReward,
  loadingCategory: state.loadingCategory,
  loadingCategoryReward: state.loadingCategoryReward,
  past: state.past,
  present: state.present
});

export default connect(mapStateToProps, {getRewards, getCategories, getCategoriesRewards, postCategoryReward, deleteCategoryReward, undoCategoryReward})(App);

