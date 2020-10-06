import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadState, saveState } from './localStorage.js'; 

const initialState = {};

const middleware = [thunk];

const reduxWindow = window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: f => f;

// const persistedState = loadState();


const store = createStore(
    rootReducer,
    // persistedState,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // reduxWindow
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

