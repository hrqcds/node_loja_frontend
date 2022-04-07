import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import { Sidebar } from './components/sidebar'
import { Compras } from "./pages/Compras"
import { CriarProdutos } from './pages/Criar_Produtos'
import { Produtos } from './pages/Produtos'

function App() {

  return (
    <BrowserRouter>
      <div className="App">

        <Sidebar />

        <Routes>
          <Route path='/' element={<Compras />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path="/produtos/create" element={<CriarProdutos />} />
        </Routes>

      </div>
    </BrowserRouter>



  )
}

export default App
