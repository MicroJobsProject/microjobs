//DEPENDENCIES
import { Link, NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//NATIVE
import AuthButton from "../auth/AuthButton";
import Dropdown from "../ui/Dropdown";
import LanguageSelector from "../ui/LanguageSelector";
import { useAuth } from "../../store/hooks";

//STATIC-FILES
import AppLogo from "../icon/AppLogo";
import AppIcon from "../icon/AppIcon";

function Header() {
  const isLogged = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
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
                <AppIcon
                  className="fill-heading"
                  role="img"
                  aria-label="Home"
                />
              </div>
              <div className="hidden md:block">
                <AppLogo
                  className="fill-heading"
                  role="img"
                  aria-label="Home"
                />
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
                    <span className="sr-only">{t("openMenu")}</span>
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      {showMenu ? "close" : "menu"}
                    </span>
                  </button>
                </li>
                {isLogged && (
                  <li className="hidden sm:block">
                    <NavLink to="/advert/new" className="btn btn-primary">
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
                        add
                      </span>
                      <span>{t("newAdvert")}</span>
                    </NavLink>
                  </li>
                )}
                <li>
                  <button className="btn btn-secondary">
                    <span className="sr-only">{t("toggleTheme")}</span>
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      nightlight
                    </span>
                  </button>
                </li>
                <li>
                  <Dropdown icon="language" className="btn btn-secondary">
                    <span className="sr-only">{t("changeLanguage")}</span>
                    <LanguageSelector />
                  </Dropdown>
                </li>
                {isLogged && (
                  <li>
                    <button className="btn btn-secondary">
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
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
                      {t("register")}
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
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      add
                    </span>
                    <span>{t("newAdvert")}</span>
                  </NavLink>
                </li>
              )}
              <li className="grid">
                <AuthButton />
              </li>
              {!isLogged && (
                <li className="grid">
                  <NavLink to="/register" className="btn btn-outlined">
                    {t("register")}
                  </NavLink>
                </li>
              )}
            </ul>
          </>
        )}
      </header>
      <div className="h-22 sm:h-30" />
    </>
  );
}

export default Header;
