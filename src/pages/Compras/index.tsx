import { useEffect, useState } from "react"
import { iPropsCompras, TabelaDeCompras } from "../../components/tabela_de_compras"
import { http } from "../../http/axios"
import "./Compras.css"

export function Compras() {

    const [compras, setCompras] = useState<iPropsCompras[]>([])

    useEffect(() => {

        const getAllPurchases = async () => {

            const response = (await http.get("/compras")).data

            setCompras(response.compras)

        }

        getAllPurchases().catch(e => console.log(e))

    }, [])


    return (
        <div className="Compras">
            <h1>Lista de compras</h1>

            <div className="ComprasButton">
                <button>Comprar</button>
            </div>

            <div className="div-table">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Total</th>
                            <th>Pagamento</th>
                            <th>Status</th>
                            <th>Criado</th>
                            <th>Opções</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            compras.map((c) => (
                                <TabelaDeCompras
                                    id={c.id}
                                    status={c.status}
                                    tipo_pagamento={c.tipo_pagamento}
                                    data_criacao={c.data_criacao}
                                    total={c.total}
                                    listaDeProdutos={c.listaDeProdutos}
                                    key={c.id} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}