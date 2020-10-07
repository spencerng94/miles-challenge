import {
    POST_CATEGORY_REWARD,
    UNDO,
    DELETE_CATEGORY_REWARD
} from '../actions/index.js';

import initialState from './index.js';

export function changeReducers (state = initialState, action){
    const { past, present, future } = state;
  
    switch(action.type){
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