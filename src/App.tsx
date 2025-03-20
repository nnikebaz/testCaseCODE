import MainPage from "./components/MainPage/MainPage";
import './util/util.css'
import "./App.css";
import { SortProvider } from "./contexts/SortContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Details from "./components/Details/Details";
import { UsersProvider } from "./contexts/usersContext";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
  <UsersProvider>
    <SortProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/test" element={<NetworkStatus/>}></Route>
        </Routes>
      </Router>
    </SortProvider>
  </UsersProvider>
  );
}

export default App;
