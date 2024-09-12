import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SignedInComponent = () => {
  const { logout } = useContext(UserContext);
  logout();
};

export { SignedInComponent };
