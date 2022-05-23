import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import FilmBox from "../FilmBox";
import "../Filmler/Style_Filmler_module.css";

const cikarButton = true;
export default function Arsivim({
  arsiv,
  setArsiv,
  filtre,
  setFiltre,
  setInputValue,
  rdb,
}) {
  const [loading, setLoading] = useState(true);
  const [filmler, setFilmler] = useState([]);

  useEffect(() => {
    setFiltre("");
    setInputValue("");
  }, [setFiltre, setInputValue]);
  useEffect(
    () => {
      if (arsiv.length > 0) {
        let array = [];
        arsiv.forEach((id) =>
          axios(
            `https://api.themoviedb.org/3/movie/${id}?api_key=6e7754bb1e34fec78f9c366f07d50de6`
          )
            .then((res) => {
              array.push(res.data);
              setFilmler([...array]);
            })
            .finally(() => {
              setTimeout(() => setLoading(false), 1000);
            })
        );
      } else {
        console.log("veri yok");
        setFilmler(arsiv);
        setTimeout(() => setLoading(false), 1000);
      }
    },
    [arsiv],
    [filtre]
  );

  return (
    <div className="filmler_container">
      <h1 className="filmler_title">My Archive</h1>

      {loading && <Loading />}
      {!loading ? (
        <ul className="filmler_ul">
          {filmler
            .filter((item) => item.title.toLowerCase().includes(filtre))
            .map((film) => (
              <li className="filmler_li" key={film.id}>
                <FilmBox
                  {...film}
                  cikarButton={cikarButton}
                  arsiv={arsiv}
                  setArsiv={setArsiv}
                  rdb={rdb}
                />
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
}
