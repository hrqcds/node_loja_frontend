import "./visualizar-produto.css"
import { useEffect, useState } from "react"
import { http } from "../../http/axios"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

export function VisualizarProdutos() {

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState(0)
    const [criacao, setCriacao] = useState("")
    const [atualizacao, setAtualizacao] = useState("")

    const { id } = useParams()

    useEffect(() => {

        const getProduto = async () => {

            const response = await http.get(`/produtos/find/${id}`)

            setNome(response.data.produto.nome)
            setDescricao(response.data.produto.descricao)
            setPreco(response.data.produto.preco)

            const c = dayjs(response.data.produto.data_criacao)
            const a = dayjs(response.data.produto.data_atualizacao)

            setCriacao(c.format("DD/MM/YYYY"))
            setAtualizacao(a.format("DD/MM/YYYY"))

        }

        getProduto().catch(e => console.log(e))

    }, [])

    return (
        <div className="cabecalho">
            <h1>Vizualização de produto</h1>

            <div className="cabecalho-p">

                <p>
                    Nome do produto: <span>{nome}</span>
                </p>

                <p>
                    Descrição do produto: <span>{descricao}</span>
                </p>

                <p>
                    Preço do produto: <span> {preco} </span>
                </p>

                <p>
                    Data de criação: <span>{criacao}</span>
                </p>

                <p>
                    Data da última atualização: <span>{atualizacao}</span>
                </p>
            </div>

        </div>

    )
}