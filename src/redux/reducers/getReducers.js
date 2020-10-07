import {
    GET_REWARDS,
    GET_CATEGORIES,
    GET_CATEGORIES_REWARDS,
    LOAD_REWARDS,
} from '../actions/index.js';
  
import initialState from './index.js';

export function getReducers (state = initialState, action){
    const { past, present, future } = state;
  
    switch(action.type){
        case GET_REWARDS:
            return {
                ...state,
                rewards: action.payload,
                loadingReward: false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loadingCategory: false
            };
        case GET_CATEGORIES_REWARDS:
            return {
                ...state,
                categoriesRewards: action.payload,
                present: action.payload,
                loadingCategoryReward: false
            };
        case LOAD_REWARDS:
            return {
                ...state,
                loading: true
            }

        default: return state;
    }
  }