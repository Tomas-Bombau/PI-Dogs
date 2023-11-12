//Hooks
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/Actions/actions";
import { Link, useLocation } from "react-router-dom";

//CSS
import css from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [menu, setMenu] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(1)



  const handleName = (event) => {
    event.preventDefault();
    const nameEntered = event.target.value;
    setName(nameEntered);
    dispatch(searchByName(nameEntered));
  };
  
  const location = useLocation()

  return (
    <nav>
      <h2>Mis Pichos 🐶</h2>
      <div
        className={css.menu}
        onClick={(e) => {
          e.stopPropagation()
          setMenu(!menu);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menu ? css.open : ""}>
      <li  onClick={() => setMenu(!menu)}>
          <Link onClick={() => setActiveUnderline(1)} className={activeUnderline === 1 ? css.underline : null} to="/home">Home</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link onClick={() => setActiveUnderline(2)} className={activeUnderline === 2 ? css.underline : null} to="/create">Crear raza</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link onClick={() => setActiveUnderline(3)} className={activeUnderline === 3 ? css.underline : null} to="/favorites">Favoritos</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link onClick={() => setActiveUnderline(4)} className={activeUnderline === 4 ? css.underline : null} to="/about">Sobre mí</Link>
        </li>
        <li>
        <Link to="/">Salir</Link>
        </li>
      </ul>
      <div className={css.enterBreed}>
        {location.pathname == '/home' ? 
        <input
          placeholder="Ingresa la raza de un perro..."
          value={name}
          onChange={handleName}
          type="text"
        /> : <input
        placeholder="Búsqueda sólo desde Home"
        disabled
      /> 
      }
      </div>
    </nav>
  );
};

export default NavBar;
