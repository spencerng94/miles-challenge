import React from 'react';
import Category from './Category.jsx';

const Categories = (props) => {
    let { categories, categoriesRewards, handleRemove, onDragOver, onDrop, onDragStart, rewards } = props;

    // change categoriesRewardsArray to be vertical

    let categoriesRewardsArray = [];
    let rewardNames = [];

    // rotate matrix so that categoriesRewardsArray is vertical
    for (var i = 0; i < categoriesRewards.length; i++) {
        let currentArray = [];
        for (var j = 0; j < categoriesRewards.length; j++) {
            currentArray.push(categoriesRewards[j][i]);
        }
        categoriesRewardsArray.push(currentArray);
    }

    rewards.forEach((reward) => rewardNames.push(reward.rewardName));

    return (
        <div>
            <ul>
                <div className="flex-container">
                    {
                        categories.map((category) => {
                            return <Category category={category.categoryName} categoryRewardArray={categoriesRewardsArray[category.categoryId - 1]} categoryId={category.categoryId} handleRemove={handleRemove} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} rewards={rewards}/>
                        })
                    }
                </div>
            </ul>
        </div>
    )
};

export default Categories;