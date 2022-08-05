import "./App.css";
import { HashRouter, Routes } from "react-router-dom";
import { NavbarRoutes } from "routes";
import { Navbar } from "components/Navbar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <Navbar />
        <main>
          <Routes>{NavbarRoutes.map((route) => route)}</Routes>
        </main>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
