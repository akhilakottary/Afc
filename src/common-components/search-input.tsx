import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './search-input.css';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Search'}
      prefix={
        <SearchOutlined style={{ color: isFocused ? '#000' : '#fff' }} />
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`custom-search-input ${isFocused ? 'focused' : ''}`}
    />
  );
};

export default SearchInput;
