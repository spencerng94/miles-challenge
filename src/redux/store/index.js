import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage.js'; 

const initialState = {};

const middleware = [thunk];

// const persistedState = loadState();

const devtools = process.env.NODE_ENV === 'test'
  ? x => x /* eslint-disable no-underscore-dangle */
  : window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable no-underscore-dangle */

// const composeEnhancers =
//   process.env.NODE_ENV !== 'production' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       name: 'App', actionsBlacklist: ['REDUX_STORAGE_SAVE']
//     }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  devtools
  // other store enhancers if any
);

const store = createStore(
    rootReducer,
    // persistedState,
    initialState,
    enhancer
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

