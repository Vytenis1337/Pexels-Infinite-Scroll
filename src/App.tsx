import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <FavoritesProvider>
        <MainPage />
      </FavoritesProvider>
    </div>
  );
}

export default App;
