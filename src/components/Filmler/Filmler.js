import { useEffect, useState } from "react";
import axios from "axios";
import FilmBox from "../FilmBox";
import "./Style_Filmler_module.css";
import Loading from "../Loading";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=6e7754bb1e34fec78f9c366f07d50de6";

export default function Main({ arsiv, filtre, setFiltre, setInputValue, rdb }) {
  const [loading, setLoading] = useState(true);
  const [filmler, setFilmler] = useState([]);
  const [baslik, setBaslik] = useState(true);

  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.results[1].title);
  //       setFilmler(data.results);
  //     })
  //     .finally(() => setTimeout(() => setLoading(false), 1000));
  // }, []);
  useEffect(() => {
    setFiltre("");
    setInputValue("");
  }, [setFiltre, setInputValue]);
  useEffect(() => {
    if (filtre.length > 0) {
      setBaslik(false);
      axios(
        `https://api.themoviedb.org/3/search/movie?api_key=6e7754bb1e34fec78f9c366f07d50de6&language=en-US&query=${filtre}&page=1&include_adult=false`
      ).then((res) => {
        setFilmler(res.data.results);
      });
    } else {
      setBaslik(true);
      axios(API_URL)
        .then((res) => {
          setFilmler(res.data.results);
        })
        .finally(() => setTimeout(() => setLoading(false), 1000));
    }
  }, [filtre]);
  useEffect(() => {}, [arsiv]);
  return (
    <div className="filmler_container">
      {baslik === true ? (
        <h1 className="filmler_title">Popüler Filmler</h1>
      ) : (
        <h1 className="filmler_title">Aranan Filmler</h1>
      )}

      {loading && <Loading />}
      {!loading ? (
        <ul className="filmler_ul">
          {filmler.map((film) =>
            arsiv.includes(film.id) ? null : (
              <li className="filmler_li" key={film.id}>
                <FilmBox rdb={rdb} {...film} />
              </li>
            )
          )}
        </ul>
      ) : null}
    </div>
  );
}
