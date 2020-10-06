import axios from 'axios';
import { GET_ERRORS } from './index.js';
import { getCategoriesRewards } from './getActions.js';

export const POST_CATEGORY_REWARD = 'POST_CATEGORY_REWARD';
export const DELETE_CATEGORY_REWARD = 'DELETE_CATEGORY_REWARD';
export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const undoCategoryReward = past => dispatch => {
    console.log('logging undoCategoryReward');
    dispatch({
        type: UNDO,
        payload: past
    })
}


export const postCategoryReward = dropData => dispatch => {
    axios
        .post(`api/categorize`, dropData)
        .then(res => {
            dispatch({
                type: POST_CATEGORY_REWARD,
                payload: res.data
            })
            dispatch(getCategoriesRewards());
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteCategoryReward = deleteData => dispatch => {
    axios({method: 'delete', url: `api/categories_rewards`, data: deleteData})
        .then(res => {
            console.log(deleteData, 'line 39')
            console.log(res.data, 'line 40')
            dispatch({
                type: DELETE_CATEGORY_REWARD,
                payload: res.data
            })
            dispatch(getCategoriesRewards());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

