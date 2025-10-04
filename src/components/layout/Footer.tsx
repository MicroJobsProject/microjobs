import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrapper">
        <div className="flex items-center justify-center">
          <span>{t("footer", { year: currentYear })}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
