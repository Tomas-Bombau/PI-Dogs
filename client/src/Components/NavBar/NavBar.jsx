import React, { useState } from "react";
import css from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { resetErrorID, searchByName } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [menu, setMenu] = useState(false);

  const handleName = (event) => {
    event.preventDefault();
    const nameEntered = event.target.value;
    setName(nameEntered);
    dispatch(searchByName(nameEntered));
  };

  const clickResetErrorID = () => {
    dispatch(resetErrorID())
  }

  return (
    <nav>
      <h2>Mis Pichos 🐶</h2>
      <div
        className={css.menu}
        onClick={(e) => {
          e.stopPropagation();
          setMenu(!menu);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menu ? css.open : ""}>
        <li>
          <Link onClick={clickResetErrorID} to="/home">Home</Link>
        </li>
        <li>
          <Link to="/create">Crear raza</Link>
        </li>
        <li>
          <a href="/home">Contactanos</a>
        </li>
      </ul>
      <div className={css.enterBreed}>
        <input
          placeholder="Ingresa la raza de un perro..."
          value={name}
          onChange={handleName}
          type="text"
        />
      </div>
    </nav>
  );
};

export default NavBar;
