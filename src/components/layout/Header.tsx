//DEPENDENCIES
import { Link, NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";

//NATIVE
import AuthButton from "../auth/AuthButton";
import { useAuth } from "../../store/hooks";

//STATIC-FILES
import AppLogo from "../icon/AppLogo";
import AppIcon from "../icon/AppIcon";

function Header() {
  const isLogged = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const maxWidth = 640;

  useEffect(() => {
    setShowMenu(false);

    const handleResize = () => {
      if (window.innerWidth >= maxWidth) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

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
                {isLogged && (
                  <li className="hidden sm:block">
                    <NavLink to="/advert/new" className="btn btn-primary">
                      <span className="material-symbols-outlined">add</span>
                      <span>New Advert</span>
                    </NavLink>
                  </li>
                )}
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
        {showMenu && (
          <>
            <div
              className="fixed inset-0 top-18.5 z-900 bg-black/15"
              onClick={() => setShowMenu(false)}
            />
            <ul className="border-border bg-container absolute left-1/2 z-990 grid w-full -translate-x-1/2 gap-2 border border-b px-6 py-8 shadow-sm">
              {isLogged && (
                <li className="grid">
                  <NavLink to="/advert/new" className="btn btn-primary">
                    <span className="material-symbols-outlined">add</span>
                    <span>New Advert</span>
                  </NavLink>
                </li>
              )}
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
          </>
        )}
      </header>
      <div className="h-25 sm:h-35" />
    </>
  );
}

export default Header;
