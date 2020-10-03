import React from 'react';

const CategoryReward = (props) => {
    let {reward, rewardId, categoryId, categoryRewardArray, handleRemove, onDragStart} = props;

    let currentRewardId = rewardId;
    let currentCategoryId = categoryId;

    let onClickHandler = (rewardId, categoryId) => {
        // console.log('in onClickHandler')
        handleRemove(currentRewardId, currentCategoryId);
    }


    // TODO: add rewardId for dragStartHandler 

    let dragStartHandler = (e) => {
        console.log('logging rewardId:', rewardId);
        let dragId = rewardId;
        let dragReward = reward;
        let dragCategory = categoryId;
        onDragStart(e, dragId, dragReward, dragCategory);
    }

   
    if (categoryRewardArray[rewardId - 1] === 1) {
        return(<div 
            className="reward"
            draggable
            onDragStart={dragStartHandler}
             >
                 <div className="closeButton">
                 <button type="button" onClick={onClickHandler}>
              X
            </button>
                 </div>
            {reward}
        </div>)
    }

    return(<div 
                className="reward"
            >
    </div>)
}

export default CategoryReward;