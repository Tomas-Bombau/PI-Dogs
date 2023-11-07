//Hooks
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";

//CSS
import css from "./NavBar.module.css";

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
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/create">Crear raza</Link>
        </li>
        <li>
          <a href="/home">Contactanos</a>
        </li>
        <li>
        <Link to="/">Salir</Link>
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
