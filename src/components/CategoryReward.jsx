import React from 'react';

const CategoryReward = (props) => {
    let {reward, rewardId, categoryId, categoryRewardArray, handleRemove, onDragStart} = props;

    let currentRewardId = rewardId;
    let currentCategoryId = categoryId;

    let onClickHandler = (rewardId, categoryId) => {
        handleRemove(currentRewardId, currentCategoryId);
    }

    let dragStartHandler = (e) => {
        console.log('logging rewardId:', rewardId);
        let dragId = rewardId;
        let dragReward = reward;
        let dragCategory = categoryId;
        onDragStart(e, dragId, dragReward, dragCategory);
    }
   
    if (categoryRewardArray[rewardId - 1] === 1) {
        return(<div 
            className="reward-category-filled"
            draggable
            onDragStart={dragStartHandler}
             >
                 <div className="closeButton">
                 <button className="close-button" onClick={onClickHandler}>
              X
            </button>
                 </div>
                 <div className="reward-category-text">
                    {reward}
                 </div>
        </div>)
    }

    return(<div 
                className="reward-category"
            >
    </div>)
}

export default CategoryReward;