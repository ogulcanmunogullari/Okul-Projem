import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import "./app.css";
//Sayfalar
import Header from "./components/Header";
import Filmler from "./components/Filmler";
import Arsivim from "./components/Arsivim";
import Film from "./components/Film";
import S404 from "./components/s404";
import Welcome from "./components/Giris";
import { auth, db } from "./components/Firebase";
import { useNavigate } from "react-router-dom";
import { set, ref, onValue, remove } from "firebase/database";

function App() {
  const [arsiv, setArsiv] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [headerV, setHeaderV] = useState(false);

  //login verisi
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          // setArsiv([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((item) => {
              setArsiv((oldArray) => [...oldArray, Number(item.movies)]);
            });
          } else {
            console.log("işlem yapamadı database boş");
          }
        });

        setHeaderV(true);
      } else {
        navigate("/");
        setHeaderV(false);
      }
    });
  }, []);

  //add
  const writeToDatabase = async (id) => {
    await set(ref(db, `/${auth.currentUser.uid}/${id}`), {
      movies: id,
    });
    // setArsiv([]);
  };
  //read
  const readDatabase = async () => {
    onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
      setArsiv([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setArsiv((oldArray) => [...oldArray, item.movies]);
        });
      } else {
        setArsiv([]);
      }
    });
  };
  //remove
  const removeDatabase = async (id) => {
    await remove(ref(db, `/${auth.currentUser.uid}/${id}`));
  };

  return (
    <div className="container">
      {headerV === true ? (
        <Header
          setFiltre={setFiltre}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setArsiv={setArsiv}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="homepage"
          element={
            <Filmler
              arsiv={arsiv}
              filtre={filtre}
              setFiltre={setFiltre}
              setInputValue={setInputValue}
            />
          }
        />
        <Route
          path="arsivim"
          element={
            <Arsivim
              arsiv={arsiv}
              setArsiv={setArsiv}
              filtre={filtre}
              setFiltre={setFiltre}
              setInputValue={setInputValue}
              rdb={removeDatabase}
              readdb={readDatabase}
            />
          }
        />
        <Route
          path="film/:id"
          element={
            <Film
              setArsiv={setArsiv}
              arsiv={arsiv}
              rdb={removeDatabase}
              wdb={writeToDatabase}
              readdb={readDatabase}
            />
          }
        />
        <Route path="*" element={<S404 />} />
      </Routes>
    </div>
  );
}

export default App;
