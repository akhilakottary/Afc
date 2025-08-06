import { Tag } from 'antd';
import './filter-category.css';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const FilterCategory = ({ categories, selected, onSelect }: Props) => {
  return (
    <div className="filter-category-wrapper">
      {categories.map((category) => (
        <Tag
          key={category}
          className={`filter-tag ${selected === category ? 'selected' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </Tag>
      ))}
    </div>
  );
};

export default FilterCategory;
