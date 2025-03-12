import MainPage from "./components/mainPage/MainPage";
import "./App.css";
import { SortProvider } from "./components/mainPage/TopAPPBar/ModalSort/SortContext";

function App() {
  return (
    <SortProvider>
      <MainPage />
    </SortProvider>
  );
}

export default App;
