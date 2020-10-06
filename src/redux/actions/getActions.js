import axios from 'axios';
import { GET_REWARDS, GET_CATEGORIES, GET_CATEGORIES_REWARDS, LOAD_REWARDS } from './index.js';

export const loadRewards = () => {
    return {
        type: LOAD_REWARDS
    }
};

export const getRewards = () => dispatch => {
    console.log('hkhkh')
    dispatch(loadRewards());
    axios.get(`/api/rewards/`)
        .then(res => 
            dispatch({
                type: GET_REWARDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_REWARDS,
                payload: {}
            })
        );
}

export const getCategories = () => dispatch => {
    axios.get(`/api/categories/`)
        .then(res => 
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CATEGORIES,
                payload: {}
            })
        );
}

export const getCategoriesRewards = () => dispatch => {
    axios.get(`/api/categories_rewards/`)
        .then(res => 
            dispatch({
                type: GET_CATEGORIES_REWARDS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CATEGORIES_REWARDS,
                payload: {}
            })
        );
}