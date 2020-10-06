import React from 'react';

const UndoRedo = (props) => {
    let { handleUndo, past } = props;

    let handleUndoClick = (e) => {
        handleUndo(e, past);
    }

    return(
        <div>   
            <button className="undoButton" onClick={handleUndoClick} >Undo/Redo</button>
        </div>
    )
}

export default UndoRedo;