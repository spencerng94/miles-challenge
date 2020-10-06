import React from 'react';
import CategoryReward from './CategoryReward.jsx';

const Category = (props) => {
    let { category, categoryId, categoryRewardArray, handleRemove, onDragOver, onDrop, onDragStart, rewards } = props;

    let onDragOverHandler = (e) => {
        onDragOver(e)
    }

    let onDropHandler = (e) => {
        let dropCategory = categoryId;
        let rewardName = e.dataTransfer.getData("rewardName");
        onDrop(e, dropCategory)
    }
        
    return (<div className="category">
        <div className="category-header">
            {category}
            <hr />
        </div>
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