import {
  GET_REWARDS,
  GET_CATEGORIES,
  GET_CATEGORIES_REWARDS,
  LOAD_REWARDS,
  POST_CATEGORY_REWARD,
  UNDO,
  DELETE_CATEGORY_REWARD
} from '../actions/index.js';

const initialState = {
    categories: [],
    rewards: [],
    categoriesRewards: [],
    loadingReward: false,
    loadingCategory: false,
    loadingCategoryReward: false,
    past: [],
    present: []
}

export default function(state = initialState, action){
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

      case POST_CATEGORY_REWARD:
          let stateBeforePost = Object.assign({}, state.present);
          stateBeforePost = Object.values(stateBeforePost);
          return {
              ...state,
              matched: action.payload,
              past: stateBeforePost
          }
          
      case DELETE_CATEGORY_REWARD:
        let stateBeforeDelete = Object.assign({}, state.present);
        stateBeforeDelete = Object.values(stateBeforeDelete);
        console.log(stateBeforeDelete, 'line 69');
          return {
              ...state,
              past: stateBeforeDelete
          };

      case UNDO:
        let stateBeforeUndo = Object.assign({}, state.present);
        stateBeforeUndo = Object.values(stateBeforeUndo);
          return {
              ...state,
              present: action.payload,
              past: stateBeforeUndo,
              categoriesRewards: action.payload  
          }
      default: return state;
  }
}