import { useNavigate } from "react-router";
import { NavbarContainer, Link } from "./style";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Home
      </Link>
      <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/todo");
        }}
      >
        TodoList
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
