import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./Header.css"
import logo from "../../assets/food-restaurant.png"

const Header = ({setSearchQuery}) => {
  const [text, setText] = useState("")

  const navigate = useNavigate()
  const location = useLocation()
  // Referencia para el timeout de debounce
  const debounceTimeout = useRef(null)

  // Aplico correccion de busqueda automatica 
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    if (!text.trim()) return;
    // Solo ejecutar si estamos en home o en /recipes
    if (location.pathname === '/' || location.pathname === '/recipes') {
      debounceTimeout.current = setTimeout(() => {
        setSearchQuery(text)
        navigate("/recipes")
      }, 1000)
    }
    return () => clearTimeout(debounceTimeout.current)
  }, [text, setSearchQuery, navigate, location.pathname])
  
    return (
    <header className='header'>
      <div className='header-left'>
        <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
        <Link to="/" className='tittle'>
          <h1>TuFood</h1>
        </Link>        

        <Link to="/recipes">Recetas</Link>
        <Link to="/favorites" className='fav'>Favoritos</Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Buscar receta..."
          className="search-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <nav className="header-right">
        {/* Espacio eliminado */}
      </nav>

      {/* Botón flotante de favoritos */}
      <Link to="/favorites" className="floating-fav-btn" aria-label="Favoritos">
        <span className="floating-fav-icon" role="img" aria-label="corazón">❤️</span>
      </Link>
    </header>
    )
  }


export default Header