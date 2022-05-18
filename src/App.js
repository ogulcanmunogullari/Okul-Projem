import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
//Sayfalar
import Header from "./components/Header";
import Filmler from "./components/Filmler";
// import Oneri from "./components/Oneri";
import Arsivim from "./components/Arsivim";
import Film from "./components/Film";
import S404 from "./components/s404";

function App() {
  const [arsiv, setArsiv] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    console.log(filtre);
  }, [filtre]);
  return (
    <div className="container">
      <Header
        setFiltre={setFiltre}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Filmler
              arsiv={arsiv}
              filtre={filtre}
              setFiltre={setFiltre}
              setInputValue={setInputValue}
            />
          }
        />
        {/* <Route path="oneri" element={<Oneri />} /> */}
        <Route
          path="arsivim"
          element={
            <Arsivim
              arsiv={arsiv}
              setArsiv={setArsiv}
              filtre={filtre}
              setFiltre={setFiltre}
              setInputValue={setInputValue}
            />
          }
        />
        <Route
          path="film/:id"
          element={<Film setArsiv={setArsiv} arsiv={arsiv} />}
        />
        <Route path="*" element={<S404 />} />
      </Routes>
    </div>
  );
}

export default App;
