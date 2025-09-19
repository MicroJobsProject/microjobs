//DEPENDENCIES
import { Outlet } from "react-router";

//NATIVE
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
