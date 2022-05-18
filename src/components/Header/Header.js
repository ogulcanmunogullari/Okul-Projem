import logo from "./logo-normal.png";
import "./style_header.css";
import { Link } from "react-router-dom";
export default function Header({ setFiltre, inputValue, setInputValue }) {
  function search(event) {
    if (event.target.value !== " ") {
      setInputValue(event.target.value);
      setFiltre(event.target.value);
    }
  }

  function sifirla() {
    setInputValue("");
    setFiltre("");
  }

  return (
    <div className="header">
      <img src={logo} alt="" />
      <ul className="list">
        <Link className="list__li" to="/">
          Popüler Filmler
        </Link>
        {/* <Link className="list__li" to="/oneri">
          Öneri Robotu
        </Link> */}
        <Link className="list__li" to="/arsivim">
          Arşivim
        </Link>
        <li className="list__li">Çıkış</li>
      </ul>
      <input
        className="search"
        type="text"
        value={inputValue}
        onChange={search}
        onClick={sifirla}
      />
    </div>
  );
}
