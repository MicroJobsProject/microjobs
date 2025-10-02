//DEPENDENCIES
import { useTranslation } from "react-i18next";
// import { useLocation, useNavigate, useParams } from "react-router";
import clsx from "clsx";

function LanguageSelector() {
  const { i18n } = useTranslation();
  // const { lang } = useParams();
  // const location = useLocation();
  // const navigate = useNavigate();
  const languages = [
    { code: "en", lang: "English" },
    { code: "es", lang: "Español" },
  ];

  function handleChangeLanguage(newLanguage: string) {
    //TODO: update URL path after language change
    // const currentPath = location.pathname.replace(`/${lang}`, "");

    i18n.changeLanguage(newLanguage);

    // navigate(`/${newLanguage}${currentPath}${location.search}`);
  }

  return (
    <ul>
      <li>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => {
              handleChangeLanguage(language.code);
            }}
            className={clsx(
              "btn btn-secondary",
              language.code === i18n.language &&
                "pointer-events-none opacity-50",
            )}
          >
            {language.lang}
          </button>
        ))}
      </li>
    </ul>
  );
}

export default LanguageSelector;
