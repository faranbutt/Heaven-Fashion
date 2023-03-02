import { Outlet, Link } from "react-router-dom";
import CrownLogo from "../../assets/crown.componet";
import { useContext } from "react";
import { UserContext } from "../../contexts/context.user";
import "./navigation.style.scss";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

const NavBar = () => {
  const { currentUser, setCurrentUser} = useContext(UserContext);
  const signOutHandler = async () => {
    await SignOutUser();
    setCurrentUser(null);
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <div>
            <CrownLogo />
          </div>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="navlink" onClick={signOutHandler}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
