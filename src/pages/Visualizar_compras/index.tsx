import "./visualizar-compras.css"
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
        <div className="cabecalho">
            <h1>
                Visualizar compra
            </h1>

            <div className="cabecalho-p">
                <p>
                    Código de compra: <span> {Number(compra?.id)} </span>
                </p>
                <p>
                    Pagamento: <span> {compra?.tipo_pagamento} </span>
                </p>
                <p>
                    Status: <span>{compra?.status}</span>
                </p>
                <p>
                    Total: <span>{compra?.total}</span>
                </p>
                <p>
                    Data da compra: <span>{data}</span>
                </p>
                <div style={{ flexDirection: "column" }}>
                    <h4>Lista de produtos</h4>

                    {compra?.listaDeProdutos.map(l => (
                        <div className="cabecalho-p" key={l.produto.id}>
                            <p>Produto: <span>{l.produto.nome}</span> - Preco: <span>R$ {l.produto.preco}</span> - Quantidade: <span>{l.quantidade}</span></p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )

}