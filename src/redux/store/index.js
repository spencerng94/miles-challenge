import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadState, saveState } from './localStorage.js'; 

const initialState = {};

const middleware = [thunk];

// const persistedState = loadState();

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__();

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}

const store = createStore(
    rootReducer,
    // persistedState,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // devTools
    )
);

store.subscribe(throttle(() => {
  saveState({
    categories: store.getState().categories,
    rewards: store.getState().rewards,
    categoriesRewards: store.getState().categoriesRewards,
    loadingReward: store.getState().loadingReward,
    loadingCategory: store.getState().loadingCategory,
    loadingCategoryReward: store.getState().loadingCategoryReward,
    past: store.getState().past,
    present: store.getState().present
  });
}, 1000));

export default store;

