// DEPENDENCIES
import { useTranslation } from "react-i18next";
import clsx from "clsx";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const languages = [
    { code: "en-US", lang: "English" },
    { code: "es-ES", lang: "Español" },
  ];

  function handleChangeLanguage(newLanguage: string) {
    i18n.changeLanguage(newLanguage);
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
