import React from 'react';

const Reward = (props) => {
    let { reward, rewardId, onDragStart } = props;

    let dragStartHandler = (e) => {
        let dragId = rewardId;
        let dragReward = reward;
        onDragStart(e, dragId, dragReward);
    }

    return (<div 
                className="reward"
                draggable
                onDragStart = {dragStartHandler}
            >
                <div className="reward-text">
                    {reward}
                </div>
    </div>)

}

export default Reward;