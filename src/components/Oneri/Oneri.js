import React, { useEffect, useState } from "react";
import axios from "axios";
import FilmBox from "../FilmBox";
import "./Style_Oneri_module.css";

function Oneri({ id, arsiv }) {
  const API_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6e7754bb1e34fec78f9c366f07d50de6&language=en-US&page=1`;
  const [oneri, setOneri] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios(API_URL)
      .then((res) => setOneri(res.data.results))
      .finally(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      });
  }, [id]);
  return (
    <div className="oneri_container">
      {!loading ? (
        <ul className="filmler_ul">
          {oneri.map((film) =>
            arsiv.includes(film.id) ? null : (
              <li className="filmler_li" key={film.id}>
                <FilmBox {...film} />
              </li>
            )
          )}
        </ul>
      ) : null}
    </div>
  );
}

export default Oneri;
