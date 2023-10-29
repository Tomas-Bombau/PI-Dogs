import React, { useState } from 'react'
import css from './NavBar.module.css'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../Redux/Actions/actions'


const NavBar = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleName = (event) => {
    event.preventDefault()
    const nameEntered = event.target.value
    setName(nameEntered)
    dispatch(searchByName(name))
  }

  return (
    <nav>
        <input placeholder='Busca un perro escribiendo su raza...' value={name} onChange={handleName} type="text" />
    </nav>
  )
}

export default NavBar