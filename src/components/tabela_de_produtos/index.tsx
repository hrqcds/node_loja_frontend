import "./Tabela_de_produtos.css"
import { FiEdit, FiEye, FiTrash } from "react-icons/fi"
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

    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.preco}</td>
            <td>{produto.descricao == "" ? "não tem descrição" : produto.descricao}</td>
            <td>{d.format("DD/MM/YYYY")}</td>
            <td style={{ padding: ".5rem" }}>
                <button className="td-button" style={{
                    padding: ".2rem",
                    marginRight: ".3rem"
                }}>
                    <FiEye />
                </button>
                <button className="td-button" style={{
                    padding: ".2rem",
                    marginRight: ".3rem"
                }}>
                    <FiEdit />
                </button>
                <button className="td-button" style={{ padding: ".2rem" }}>
                    <FiTrash />
                </button>
            </td>

        </tr>
    )
}


