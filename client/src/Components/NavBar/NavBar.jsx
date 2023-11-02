import React, { useState } from 'react'
import css from './NavBar.module.css'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../Redux/Actions/actions'
import {Link} from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleName = (event) => {
    event.preventDefault()
    const nameEntered = event.target.value
    setName(nameEntered)
    dispatch(searchByName(nameEntered))
  }

  return (
    <nav className={css.navBar}>
      <ul>
        <Link className={css.link} to='/home'><li>Home</li></Link>
        <Link to='/create'><li>Create</li></Link>
        <li>Contactanos</li>
      </ul>
        <input placeholder='Busca un perro escribiendo su raza...' value={name} onChange={handleName} type="text" />
    </nav>
  )
}

export default NavBar