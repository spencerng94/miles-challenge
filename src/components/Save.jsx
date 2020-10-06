import React from 'react';

const Save = (props) => {
    let { handleSave, state } = props;

    let handleSaveClick = (e) => {
        handleSave(e, state);
    }

    return(
        <div>   
            <button className="saveButton" onClick={handleSaveClick} >Save</button>
        </div>
    )
}

export default Save;