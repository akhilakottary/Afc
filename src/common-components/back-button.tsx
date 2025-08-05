interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const IconButton = ({ icon, onClick, className = '' }: IconButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {icon}
    </button>
  );
};

export default IconButton;