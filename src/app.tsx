import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register-page";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <h2>Hello, World!</h2>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
