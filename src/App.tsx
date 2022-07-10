import "./App.css";
import { HashRouter, Routes } from "react-router-dom";
import { NavbarRoutes } from "routes";
import { Navbar } from "components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>{NavbarRoutes.map((route) => route)}</Routes>
      </main>
    </HashRouter>
  );
}

export default App;
