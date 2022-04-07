import "./Deletar-produtos.css"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { http } from "../../http/axios"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"

export function DeletarProdutos() {

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState(0)
    const [criacao, setCriacao] = useState("")
    const [atualizacao, setAtualizacao] = useState("")


    const navigate = useNavigate()
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


    const deletar = async () => {

        if (!nome || !descricao || !preco) {
            toast.error("Campos obrigatórios estão vázios", {
                duration: 1250,
            })
            return
        }

        try {

            await http.delete(`/produtos/delete/${id}`)

            toast.success("Produto deletado com sucesso",)
            return navigate("/produtos")
        } catch (e) {

            toast.error("Erro na requisição", {
                duration: 1250,
            })
            return
        }
    }

    return (
        <div className="cabecalho">
            <h1>Deleção de produtos</h1>

            <div className="cabecalho-p">

                <p>
                    Nome do produto: <span> {nome} </span>
                </p>

                <p>
                    Descrição do produto:  <span>{descricao}</span>
                </p>

                <p>
                    Preço do produto: <span>{preco}</span>
                </p>

                <p>
                    Data de criação: <span>{criacao}</span>
                </p>

                <p>
                    Data da última atualização: <span>{atualizacao}</span>
                </p>

                <button onClick={deletar}>
                    Deletar produto
                </button>
            </div>
        </div>

    )
}