import './input.css';

interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type = 'text', placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;