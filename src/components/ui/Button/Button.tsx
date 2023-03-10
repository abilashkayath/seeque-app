import "./Button.css";

export type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  type?: string;
};

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <>
      <button className={`button ${type ? type : "link"}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;
