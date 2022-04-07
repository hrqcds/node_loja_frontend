import "./Tabela_de_produtos.css"
import { FiEdit, FiEye, FiTrash } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

interface iPropsProdutos {
    produto: {
        id: number
        nome: string
        descricao: string
        preco: number
        data_criacao: Date
        data_atualizacao: Date
    }
}


export function TabelaDeProdutos({ produto }: iPropsProdutos) {

    const d = dayjs(produto.data_criacao)
    const navigate = useNavigate()

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.descricao == "" ? "não tem descrição" : produto.descricao}</td>
            <td>{produto.preco}</td>
            <td>{d.format("DD/MM/YYYY")}</td>
            <td style={{ padding: ".5rem" }}>

                <button
                    onClick={() => {
                        navigate(`/produtos/view/${produto.id}`)
                    }}
                    className="td-button"
                    style={{
                        padding: ".2rem",
                        marginRight: ".3rem"
                    }}>
                    <FiEye />
                </button>

                <button
                    onClick={() => {
                        navigate(`/produtos/edit/${produto.id}`)
                    }}
                    className="td-button"
                    style={{
                        padding: ".2rem",
                        marginRight: ".3rem"
                    }}>
                    <FiEdit />
                </button>

                <button
                    onClick={() => {
                        navigate(`/produtos/delete/${produto.id}`)
                    }}
                    className="td-button" style={{ padding: ".2rem" }}>
                    <FiTrash />
                </button>
            </td>

        </tr>
    )
}


