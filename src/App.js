import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SurveyComponent from "./SurveyComponent";
import HomeComponent from "./HomeComponent";
import ResultsComponent from "./ResultsComponent";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path ="/" element ={<HomeComponent />} />
              <Route path ="/survey" element={<SurveyComponent /> } />
              <Route path ="/results" element={<ResultsComponent /> } />
          </Routes>
      </BrowserRouter>
  );
}

export default App;