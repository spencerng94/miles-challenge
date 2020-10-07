import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage.js'; 

const initialState = {};

// const middleware = [thunk];

// const persistedState = loadState();

// const devtools = process.env.NODE_ENV === 'test'
//   ? x => x /* eslint-disable no-underscore-dangle */
//   : window.__REDUX_DEVTOOLS_EXTENSION__
//       && window.__REDUX_DEVTOOLS_EXTENSION__();
// /* eslint-enable no-underscore-dangle */

// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // options like actionSanitizer, stateSanitizer
//     }) : composeWithDevTools;

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
]

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
    rootReducer,
    // persistedState,
    initialState,
    enhancer
    // enhancer
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

