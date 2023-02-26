import './App.css'
import Router from './components/Router/Router';
import { WeatherDataProvider } from "./contexts/WeatherDataContext";

function App() {
  return <WeatherDataProvider>
    <Router />
  </WeatherDataProvider>;
}

export default App
