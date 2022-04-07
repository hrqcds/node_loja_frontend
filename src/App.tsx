import { Toaster } from 'react-hot-toast'
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
import { DeletarProdutos } from './pages/Deletar_produtos'
import { EditarProdutos } from './pages/Editar_Produtos'
import { EfetuarCompras } from './pages/Efetuar_compras'
import { Produtos } from './pages/Produtos'
import { VisualizarCompra } from './pages/Visualizar_compras'
import { VisualizarProdutos } from './pages/Visualizar_produto'

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <div className="App">

        <Sidebar />

        <Routes>
          <Route path='/' element={<Compras />} />
          <Route path='/compras/create' element={<EfetuarCompras />} />
          <Route path='/compras/view/:id' element={<VisualizarCompra />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path="/produtos/create" element={<CriarProdutos />} />
          <Route path="/produtos/edit/:id" element={<EditarProdutos />} />
          <Route path='/produtos/delete/:id' element={<DeletarProdutos />} />
          <Route path='/produtos/view/:id' element={<VisualizarProdutos />} />
          <Route path="*" element={(<h1>Página não existe</h1>)} />
        </Routes>

      </div>
    </BrowserRouter>



  )
}

export default App
