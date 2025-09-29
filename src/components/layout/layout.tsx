//DEPENDENCIES
import { Outlet } from "react-router";

//NATIVE
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <>
      <h1 className="sr-only">MicroJobs</h1>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
