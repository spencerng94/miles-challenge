import { combineReducers } from 'redux';
import {
  GET_REWARDS,
  GET_CATEGORIES,
  GET_CATEGORIES_REWARDS,
  LOAD_REWARDS,
  POST_CATEGORY_REWARD,
  UNDO,
  DELETE_CATEGORY_REWARD
} from '../actions/index.js';

import { changeReducers } from './changeReducers.js';
import { getReducers } from './getReducers.js';

export const initialState = {
    categories: [],
    rewards: [],
    categoriesRewards: [],
    loadingReward: false,
    loadingCategory: false,
    loadingCategoryReward: false,
    past: [],
    present: []
}

export default combineReducers({
    changeReducers, getReducers
})


