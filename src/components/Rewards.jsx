import React from 'react';
import Reward from './Reward.jsx';

const Rewards = (props) => {
    let { rewards, onDragStart } = props;

    return (
        <div>
            <ul>
                {
                    rewards.map((reward) => {
                        return <Reward reward={reward.rewardName} rewardId={reward.rewardId} onDragStart={onDragStart}/>
                    })
                }
            </ul>
        </div>
    )
};

export default Rewards;