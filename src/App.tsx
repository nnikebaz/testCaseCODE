import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import { SortProvider } from "./components/MainPage/TopAPPBar/ModalSort/SortContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <SortProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </Router>
    </SortProvider>
  );
}

export default App;
