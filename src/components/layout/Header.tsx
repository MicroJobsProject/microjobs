//DEPENDENCIES
import React from "react";
import { Link, NavLink } from "react-router";

//NATIVE
import AuthButton from "../auth/AuthButton";
import { useAuth } from "../../store/hooks";

const Navbar: React.FC = () => {
  const isLogged = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">MicroJobs</Link>
        <div>
          <ul>
            {!isLogged && (
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            )}

            {isLogged && (
              <li>
                <NavLink to="/new-advert">New Advert</NavLink>
              </li>
            )}

            <li>
              <AuthButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
