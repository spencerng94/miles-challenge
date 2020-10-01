import React from 'react';
import Category from './Category.jsx';

const Categories = (props) => {
    let { categories, onDragOver, onDrop } = props;

    return (
        <div>
            <ul>
                <div className="flex-container">
                    {
                        categories.map((category) => {
                            return <Category category={category.categoryName} categoryId={category.categoryId} onDrop={onDrop} onDragOver={onDragOver}/>
                        })
                    }
                </div>
            </ul>
        </div>
    )
};

export default Categories;