import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  width?: string;	
  height?: string;
  className?: string;
}
	
const Button = ({
  text,
  onClick,
  icon,
  type = 'primary',
  width = '',
  height = '',
  className = '',
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${type} ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
