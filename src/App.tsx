import React from "react";
import { BrowserRouter } from "react-router-dom";
import Start from "./views/start";
import Results from "./views/results";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Start />
      </BrowserRouter>
    </div>
  );
}

export default App;
