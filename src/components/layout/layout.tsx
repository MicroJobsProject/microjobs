//DEPENDENCIES
import { Outlet, useParams } from "react-router";

//NATIVE
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Layout() {
  const { i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="sr-only">MicroJobs</h1>
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
