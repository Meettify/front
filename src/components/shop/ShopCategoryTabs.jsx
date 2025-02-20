import categories from "../../stores/shopCategory.jsx";
import React, { useContext} from 'react';
import { CategoryContext } from "../../pages/shop/ShopPage";
import "./ShopCategoryTabs.css";

const ShopCategoryTabs = React.memo(()=>{
    const {selectedCategory, updateSelectedCategory} = useContext(CategoryContext);
    const handleCategoryClick = (category) => {
        updateSelectedCategory(category);
    };

    return(
        <>
        <div className="tabs-icon-area">
            <div className="scroll-x-area">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`btn-category btn-category-${category.id} ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <span className="icon">{category.icon()}</span>
                        <span className="text">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
        </>
    )
});

export default ShopCategoryTabs;