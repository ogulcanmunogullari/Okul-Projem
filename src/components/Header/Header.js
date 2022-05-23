import logo from "./logo-normal.png";
import "./style_header.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function Header({
  setFiltre,
  inputValue,
  setInputValue,
  setArsiv,
}) {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth)
      .then(navigate("/"))
      .then(setArsiv([]))
      .catch((err) => {
        alert(err.massage);
      });
  };

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
      <Link to="/homepage">
        <img src={logo} alt="" />
      </Link>
      <ul className="list">
        <Link className="list__li" to="/homepage">
          Popular Movies
        </Link>

        <Link className="list__li" to="/arsivim">
          Archive
        </Link>
        <li className="list__li" onClick={handleSignOut}>
          Log Out
        </li>
      </ul>
      <input
        className="search"
        type="text"
        value={inputValue}
        onChange={search}
        onClick={sifirla}
        placeholder="Search"
      />
    </div>
  );
}
