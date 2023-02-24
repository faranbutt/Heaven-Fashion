import "./category-menu.styles.scss";
import Category from "../category-item/category-item.component";
const CategoryMenu = ({categories}) => {
  return (
    <div className="categories-container">
      {categories.map(({ id, title, imageUrl }) => (
        <Category key={id} title={title} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default CategoryMenu;
