import { useEffect, useState } from "react"
import { TabelaDeProdutos } from "../../components/tabela_de_produtos"
import { http } from "../../http/axios"
import "./Produtos.css"

interface iRequestProducts {
    id: number
    nome: string
    descricao: string
    preco: number
    data_criacao: Date
    data_atualizacao: Date
}

export function Produtos() {

    const [produtos, setProdutos] = useState<iRequestProducts[]>([])

    useEffect(() => {
        const getAllProducts = async () => {
            const data = (await http.get("/produtos")).data

            setProdutos(data.produtos)
        }

        getAllProducts().catch(e => console.log(e))


    }, [])



    return (
        <div className="Produtos">
            <h1>Lista de produtos</h1>

            <div className="ProdutosButton">
                <button>Cadastrar</button>
            </div>

            <div className="div-table">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Preço</th>
                            <th>Descricao</th>
                            <th>Data de criação</th>
                            <th>Opções</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map(p => (
                            <TabelaDeProdutos key={p.id} produto={p} />
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    )
}