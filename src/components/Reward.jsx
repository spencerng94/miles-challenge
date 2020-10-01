import React from 'react';

const Reward = (props) => {
    let { reward, rewardId, onDragStart } = props;

    let dragStartHandler = (e) => {
        console.log('logging rewardId:', rewardId);
        let dragId = rewardId;
        onDragStart(e, dragId);
    }

    return (<div 
                className="reward"
                draggable
                onDragStart = {dragStartHandler}
            >
        {reward}
    </div>)

}

export default Reward;