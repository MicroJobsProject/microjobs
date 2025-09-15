import React from "react";
import { Link, NavLink } from "react-router";
import AuthButton from "../auth/AuthButton";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <Link to="/">MicroJobs</Link>
        <div>
          <ul>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/advert/new">New Advert</NavLink>
            </li>
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
