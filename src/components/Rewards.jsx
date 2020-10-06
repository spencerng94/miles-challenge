import React from 'react';
import Reward from './Reward.jsx';

const Rewards = (props) => {
    console.log(props, 'logging props line 5')
    let { rewards, onDragStart } = props;

    return (
        <div className="rewardDivider">
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