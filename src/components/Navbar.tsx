import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <Link to="/">MicroJobs</Link>
        <div>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
