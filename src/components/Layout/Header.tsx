import { Link, NavLink } from "react-router";
import AuthButton from "../auth/AuthButton";
import AppLogo from "../icon/AppLogo";
import AppIcon from "../icon/AppIcon";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/hooks";

function Header() {
  const isLogged = useAuth();
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
                {isLogged && (
                  <li>
                    <button className="btn btn-secondary">
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                    </button>
                  </li>
                )}
                <li className="hidden sm:block">
                  <AuthButton />
                </li>
                {!isLogged && (
                  <li className="hidden sm:block">
                    <NavLink to="/register" className="btn btn-outlined">
                      Register
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {showMenu && (
        <ul className="border-border bg-container absolute top-20 left-1/2 z-980 mt-2 grid w-full max-w-sm -translate-x-1/2 gap-2 rounded-lg border border-b px-6 py-8 shadow-sm">
          <li className="grid">
            <NavLink to="/advert/new" className="btn btn-primary">
              <span className="material-symbols-outlined">add</span>
              <span>New Advert</span>
            </NavLink>
          </li>
          <li className="grid">
            <AuthButton />
          </li>
          {!isLogged && (
            <li className="grid">
              <NavLink to="/register" className="btn btn-outlined">
                Register
              </NavLink>
            </li>
          )}
        </ul>
      )}
      <div className="h-25 sm:h-35"></div>
    </>
  );
}

export default Header;
