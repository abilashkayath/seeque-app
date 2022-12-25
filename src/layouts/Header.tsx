import { Title } from "../components/ui/Typography/Typography";
import "./Header.css";

const Header = ({}) => {
  return (
    <div className="header">
      <Title text="Seeqe Employee List" level={1} color="white" />
    </div>
  );
};

export default Header;
