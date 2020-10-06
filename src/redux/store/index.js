import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadState, saveState } from './localStorage.js'; 

const initialState = {};

const middleware = [thunk];

// const persistedState = loadState();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // options like actionSanitizer, stateSanitizer
    }) : composeWithDevTools;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

// const store = createStore(reducer, enhancer);


const store = createStore(
    rootReducer,
    // persistedState,
    initialState,
    enhancer
    // composeWithDevTools(
    //   applyMiddleware(...middleware)
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

