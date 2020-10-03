import React from 'react';
import CategoryReward from './CategoryReward.jsx';

const Category = (props) => {
    let { category, categoryId, categoryRewardArray, handleRemove, onDragOver, onDrop, onDragStart, rewards } = props;

    let validRewards = [];

    // categoryId = 1 more than index
    
    // check rewardsArray to see if index at categoryId - 1 = 1;
        // if it is = 1, render

    let onDragOverHandler = (e) => {
        // console.log('jjhklhlh', e);
        onDragOver(e)
    }

    let onDropHandler = (e) => {
        let dropCategory = categoryId;
        let rewardName = e.dataTransfer.getData("rewardName");
        console.log(rewardName, 'logging rewardName')
        // console.log(categoryRewardArray, 'logging categoryRewardArray')
        onDrop(e, dropCategory)
        // this is the rewardName
    }

    // TODO: add rewardId for dragStartHandler 

    // let dragStartHandler = (e) => {
    //     console.log('logging rewardId:', rewardId);
    //     let dragId = rewardId;
    //     let dragReward = reward;
    //     onDragStart(e, dragId, dragReward);
    // }
        
    return (<div className="category">
        {category}
        <hr />
        <div className="droppable"
            onDragOver={onDragOverHandler}
            onDrop={onDropHandler}
            >
            <div>
                <ul>
                    {
                        rewards.map((reward) => {
                            return <CategoryReward reward={reward.rewardName} rewardId={reward.rewardId} categoryId={categoryId} categoryRewardArray={categoryRewardArray} onDragStart={onDragStart} handleRemove={handleRemove}/>
                        })
                    }

                </ul>
                
            </div>
        </div>

    </div>)


}

export default Category;