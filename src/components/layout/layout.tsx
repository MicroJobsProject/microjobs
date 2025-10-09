//DEPENDENCIES
import { Outlet } from "react-router";

//NATIVE
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
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
