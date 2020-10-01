import React from 'react';

const Category = (props) => {
    let { category, categoryId, onDragOver, onDrop } = props;

    let onDragOverHandler = (e) => {
        onDragOver(e)
    }

    let onDropHandler = (e) => {
        let dropCategory = categoryId;
        onDrop(e, dropCategory)
    }

    return (<div className="category">
        {category}
        <hr />
        <div className="droppable"
            onDragOver={onDragOverHandler}
            onDrop={onDropHandler}
            >
            test
        </div>

    </div>)

}

export default Category;