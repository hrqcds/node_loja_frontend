import { useEffect, useState } from "react"
import { http } from "../../http/axios"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import toast from "react-hot-toast"

export function VizualizarProdutos() {

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
        <div>
            <h1>Vizualização de produto</h1>

            <p>
                Nome do produto: {nome}
            </p>

            <p>
                Descrição do produto: {descricao}
            </p>

            <p>
                Preço do produto: {preco}
            </p>

            <p>
                Data de criação: {criacao}
            </p>

            <p>
                Data da última atualização: {atualizacao}
            </p>

        </div>

    )
}