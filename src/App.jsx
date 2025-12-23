import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Recetas from "./pages/Recetas/Recetas"
import Favorites from './pages/Favorites/Favorites'
import RecipeDetail from './pages/RecipeDetails/RecipeDetail'
import Header from './components/Header/Header'
import { useState } from 'react'
import Footer from './components/Footer/Footer'

function App() {

  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
    <Header setSearchQuery= {setSearchQuery}/>
    <Routes>
      <Route path='/' element={<Home searchQuery={searchQuery}/>}/>
      <Route path="/recipes" element={<Recetas searchQuery={searchQuery} />} />
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='/recipe/:id' element={<RecipeDetail/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
