import React from "react";
import logo from "./logo-normal.png";
import "./style_header.css";
export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <ul className="list">
        <li className="list__li">Ana Sayfa</li>
        <li className="list__li">Kategoriler</li>
        <li className="list__li">Arşivim</li>
        <li className="list__li">Çıkış</li>
      </ul>
      <input className="search" type="text" />
    </div>
  );
}
