import dayjs from "dayjs";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";

interface iPropsListaDeProdutos {

    quantidade: number,
    produto: {
        id: number
        nome: string
        descricao: string
        preco: number
        data_criacao: Date
        data_atualizacao: Date
    }

}

export interface iPropsCompras {
    id: number
    status: string
    tipo_pagamento: string
    total: number
    data_criacao: Date
    listaDeProdutos: iPropsListaDeProdutos[]

}


export function TabelaDeCompras(
    { id, tipo_pagamento,
        status, total,
        data_criacao, listaDeProdutos }: iPropsCompras) {

    const d = dayjs(data_criacao)

    return (
        <tr>
            <td>{id}</td>
            <td>{total}</td>
            <td>{tipo_pagamento}</td>
            <td>{status}</td>
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