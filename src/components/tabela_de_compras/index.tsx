import dayjs from "dayjs";
import toast from "react-hot-toast";
import { FiEdit, FiCheck, FiEye, } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { http } from "../../http/axios";

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
    const navigate = useNavigate()

    const EfetuarPagamento = async () => {

        if (status == "CONCLUIDO") {
            toast.success("Pagamento já efetuado", {
                duration: 1250
            })
            return
        }

        await http.put(`/compras/update/${id}`, {
            status: "concluido",
            tipo_pagamento
        })

        toast.success("Atualizado com sucesso", {
            duration: 1250
        })

        setTimeout(() => {
            window.location.reload()
        }, 1250)


    }

    return (
        <tr>
            <td>{id}</td>
            <td>{total}</td>
            <td>{tipo_pagamento}</td>
            <td>{status}</td>
            <td>{d.format("DD/MM/YYYY")}</td>
            <td style={{ padding: ".5rem" }}>

                <button
                    onClick={() => {
                        navigate(`/compras/view/${id}`)
                    }}
                    className="td-button" style={{
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

                <button onClick={EfetuarPagamento} className="td-button" style={{ padding: ".2rem" }}>
                    <FiCheck />
                </button>
            </td>
        </tr>
    )
}