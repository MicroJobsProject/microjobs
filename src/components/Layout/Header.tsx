import { Link, NavLink } from "react-router";
import AuthButton from "../auth/AuthButton";
import AppLogo from "../icon/AppLogo";
import AppIcon from "../icon/AppIcon";
import { useEffect, useState } from "react";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const maxWidth = 640;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= maxWidth) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header>
        <div className="wrapper">
          <div className="flex items-center justify-between">
            <Link to="/" className="mr-2 transition-opacity hover:opacity-75">
              <div className="block md:hidden">
                <AppIcon className="fill-heading" />
              </div>
              <div className="hidden md:block">
                <AppLogo className="fill-heading" />
              </div>
            </Link>
            <nav>
              <ul className="flex items-center gap-2">
                <li className="block sm:hidden">
                  <button
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    className="btn btn-secondary"
                  >
                    <span className="sr-only">Open menu</span>
                    <span className="material-symbols-outlined">
                      {showMenu ? "close" : "menu"}
                    </span>
                  </button>
                </li>
                <li className="hidden sm:block">
                  <NavLink to="/advert/new" className="btn btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    <span>New Advert</span>
                  </NavLink>
                </li>
                <li>
                  <button className="btn btn-secondary">
                    <span className="material-symbols-outlined">
                      nightlight
                    </span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-secondary">
                    <span className="material-symbols-outlined">language</span>
                  </button>
                </li>
                <li>
                  <button className="btn btn-secondary">
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </button>
                </li>
                <li className="hidden sm:block">
                  <AuthButton className="btn btn-outlined" />
                </li>
                <li className="hidden sm:block">
                  <NavLink to="/register" className="btn btn-outlined">
                    Register
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {showMenu && (
        <ul className="border-border bg-container absolute left-0 mx-auto flex w-full items-center justify-baseline gap-2 border-b px-6 py-3 shadow-sm">
          <li>
            <NavLink to="/advert/new" className="btn btn-primary">
              <span className="material-symbols-outlined">add</span>
              <span>New Advert</span>
            </NavLink>
          </li>
          <li>
            <AuthButton className="btn btn-outlined" />
          </li>
          <li>
            <NavLink to="/register" className="btn btn-outlined">
              Register
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}

export default Header;
