import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"
import logo from "../../assets/food-restaurant.png"

const Header = ({setSearchQuery}) => {
  const [text, setText] = useState("")
  const navigate = useNavigate()
      // Ejecutamos la búsqueda para navegar a recetas
    const handleSearch = () => {
      if (!text.trim()) return;
      setSearchQuery(text);
      navigate("/recipes");
    }
  
    return (
    <header className='header'>
      <div className='header-left'>
        <img src={logo} alt="logo" className='logo'/>
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
        onKeyDown={(e) => {
          if (e.key === "Enter") 
            handleSearch()
        }
      }
      />

      <button className="search-button"
      onClick={()=> {
        setSearchQuery(text)
        navigate('/recipes')
      }}      
      >
        Buscar
      </button>
    </div>

    <nav className="header-right">
      <p>Login</p>
    </nav>
    </header>
    )
  }


export default Header