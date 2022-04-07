import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { iPropsCompras } from "../../components/tabela_de_compras"
import { http } from "../../http/axios"

export function VisualizarCompra() {

    const [compra, setCompra] = useState<iPropsCompras | undefined>()
    const [data, setData] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {

        const getCompra = async () => {
            const response = (await http.get(`/compras/find/${id}`)).data

            setCompra(response.compra)
            const d = dayjs(response.compra.data_criacao)
            setData(d.format("DD/MM/YYYY"))
        }

        getCompra().catch(e => console.log(e))


    }, [])

    return (
        <div>
            <h1>
                Visualizar compra
            </h1>

            <p>
                Código de compra: {Number(compra?.id)}
            </p>
            <p>
                Pagamento: {compra?.tipo_pagamento}
            </p>
            <p>
                Status: {compra?.status}
            </p>
            <p>
                Total: {compra?.total}
            </p>
            <p>
                Data da compra: {data}
            </p>
            <div>
                <h4>Lista de produtos</h4>
                {compra?.listaDeProdutos.map(l => (
                    <div key={l.produto.id}>
                        <p>Produto: {l.produto.nome}</p>
                        <p>Preco: {l.produto.preco}</p>
                        <p>Quantidade: {l.quantidade}</p>
                    </div>
                ))}

            </div>
        </div>
    )

}