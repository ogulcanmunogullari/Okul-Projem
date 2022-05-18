import React from "react";
import { Link } from "react-router-dom";
import "./Style_FilmBox_module.css";
const API_IMG = "https://image.tmdb.org/t/p/w500";
let array = [];
function FilmBox({ title, poster_path, id, cikarButton, arsiv, setArsiv }) {
  function remove(id) {
    array = arsiv;
    const index = arsiv.indexOf(id);
    array.splice(index, 1);
    setArsiv([...array]);
  }
  return (
    <div className="box_container">
      <Link to={`/film/${id}`}>
        <img className="box_img" src={API_IMG + poster_path} alt="" />
        <h4 className="box_title">{title}</h4>
      </Link>
      {cikarButton && (
        <button className="box_button" onClick={() => remove(id)}>
          Arşivden Kaldır
        </button>
      )}
    </div>
  );
}

export default FilmBox;
