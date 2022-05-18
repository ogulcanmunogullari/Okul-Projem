import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Style_Film_module.css";
import axios from "axios";
import Loading from "../Loading";
import Oneri from "../Oneri";

const API_IMG = "https://image.tmdb.org/t/p/w500";
let array = [];
function Film({ arsiv, setArsiv }) {
  const { id } = useParams();
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=6e7754bb1e34fec78f9c366f07d50de6`;

  const [loading, setLoading] = useState(true);
  const [film, setFilm] = useState([]);

  useEffect(() => {
    axios(API_URL)
      .then((res) => setFilm(res.data))
      .finally(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      });
  }, [id]);

  useEffect(() => {
    array = arsiv;
  }, [arsiv]);

  function remove(id) {
    const index = arsiv.indexOf(id);
    array.splice(index, 1);
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
              <h2 className="film_release yas">
                {film.adult ? "+18" : "+18 Değil"}
              </h2>
            </div>
            <p className="film_description">{film.overview}</p>

            {arsiv.includes(film.id) ? (
              <button
                className="film_button kaldir"
                onClick={() => remove(film.id)}
              >
                Arşivden Kaldır
              </button>
            ) : (
              <button
                className="film_button ekle"
                onClick={() => setArsiv([...arsiv, film.id])}
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
