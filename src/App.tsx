import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import { SortProvider } from "./components/MainPage/TopAPPBar/ModalSort/SortContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Details from "./components/Details/Details";
import { UsersProvider } from "./components/MainPage/usersContext";

function App() {
  return (
  <UsersProvider>
    <SortProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </Router>
    </SortProvider>
  </UsersProvider>
  );
}

export default App;
