import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Style_Film_module.css";
import axios from "axios";
import Loading from "../Loading";
import Oneri from "../Oneri";

const API_IMG = "https://image.tmdb.org/t/p/w500";
function Film({ arsiv, setArsiv, rdb, wdb, readdb }) {
  const { id } = useParams();
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=6e7754bb1e34fec78f9c366f07d50de6`;
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState([]);
  const [sayac, setSayac] = useState([null]);

  useEffect(
    () => {
      axios(API_URL)
        .then((res) => setFilm(res.data))
        .finally(() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        });
    },
    [API_URL, id, arsiv],
    []
  );

  useEffect(() => {
    setArray([...arsiv]);
    if (arsiv.includes(film.id)) {
      setSayac(true);
    } else {
      setSayac(false);
    }
  }, [arsiv, film.id, setArsiv]);

  function remove(id) {
    const index = arsiv.indexOf(id);
    array.splice(index, 1);
    rdb(id);
    readdb();
    setArsiv([...array]);
  }

  return (
    <div>
      {loading && <Loading />}
      {!loading ? (
        <div className="film_container">
          <img
            className="film_img"
            src={API_IMG + film.poster_path}
            alt={film.title}
          />
          <div className="film_second_container">
            <h1 className="film_title">{film.title}</h1>
            <div className="film_flex">
              <h2 className="film_release">{film.release_date}</h2>
            </div>
            <p className="film_description">{film.overview}</p>
            {sayac === true ? (
              <button
                className="film_button kaldir"
                onClick={() => {
                  remove(film.id);
                }}
              >
                Arşivden Kaldır
              </button>
            ) : (
              <button
                className="film_button ekle"
                onClick={() => {
                  wdb(film.id);
                  setArsiv([...arsiv, film.id]);
                }}
              >
                Arşive Ekle
              </button>
            )}
          </div>
        </div>
      ) : null}
      <Oneri id={id} arsiv={arsiv} />
    </div>
  );
}

export default Film;
