import { Link } from "react-router-dom";
import "./Sidebar.css"

export function Sidebar() {

    return (
        <nav className='Sidebar'>
            <Link to="/">Compras</Link>
            <Link to="/produtos">Produtos</Link>
        </nav>
    )

}