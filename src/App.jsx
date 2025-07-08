import { Outlet } from "react-router-dom";
import Header from "./sections/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
