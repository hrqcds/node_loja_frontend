import "./Editar-pagamento.css"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { http } from "../../http/axios"
import { useNavigate } from "react-router-dom"
import { FiTrash } from "react-icons/fi"
import { useParams } from "react-router"
import dayjs from "dayjs"

interface iResponseProdutos {
    quantidade: number
    produto: {
        id: number
        nome: string
        descricao: string
        preco: number
        data_criacao: Date
        data_atualizacao: Date
    }
}

interface iCompra {
    id: number
    status: string
    tipo_pagamento: string
    total: number
    data_criacao: Date
    listaDeProdutos: iResponseProdutos[]
}

interface iResponse {
    status: string
    compra: iCompra
}

export function EditarPagamento() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [total, setTotal] = useState(0)
    const [produtosSelecionados, setProdutosSelecionados] = useState<iCompra>()
    const [pagamento, setPagamento] = useState("")
    const [data, setData] = useState("")

    useEffect(() => {

        const getCompra = async () => {

            const response = (await http.get<iResponse>(`/compras/find/${id}`)).data

            if (!response) {
                toast.error("erro na requisição", {
                    duration: 1250
                })
                return
            }

            if (response.compra.status === "CONCLUIDO") {
                toast.error("Compra já foi concluída", {
                    duration: 1250
                })
                navigate("/")
                return
            }

            setProdutosSelecionados(response.compra)
            setPagamento(response.compra.tipo_pagamento)
            setTotal(response.compra.total)

            const d = dayjs(response.compra.data_criacao)

            setData(d.format('DD/MM/YYYY'))

        }

        getCompra().catch(e => console.log(e))
    }, [])


    const editar = async () => {


        if (pagamento === produtosSelecionados?.tipo_pagamento) {
            toast.success("Pagamento atualizado", {
                duration: 1250
            })
            navigate("/")
            return
        }

        try {


            await http.put(`/compras/update/${id}`, {
                tipo_pagamento: pagamento,
                status: "aguardando",
            })

            toast.success("Pagamento atualizado")
            return navigate("/")
        } catch (e) {
            toast.error("Erro na requisição", {
                duration: 1250,
            })
            return
        }
    }

    return (
        <div className="cabecalho">
            <h1>Editar Pagamento - Total: R$ {total}</h1>

            <div className="cabecalho-p">

                <p>
                    Código da compra <span>{produtosSelecionados?.id}</span>
                </p>

                <p>
                    Status da compra <span>{produtosSelecionados?.status}</span>
                </p>

                <p>

                    Data da compra <span>{data}</span>
                </p>

                <div>
                    <p>
                        Tipo de pagamento
                    </p>
                    <select value={pagamento.toLowerCase()} onChange={e => setPagamento(e.target.value)}>
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="credito">Credito</option>
                        <option value="debito">Debito</option>
                        <option value="dinheiro">Dinheiro</option>
                    </select>
                </div>
                <div style={{ flexDirection: "column" }}>
                    <h2>Lista de Produtos</h2>
                    {
                        produtosSelecionados?.listaDeProdutos.map(p => (
                            <div className="teste" key={p.produto.id}>
                                <p>Código: <span>{p.produto.id}</span></p>
                                <p>Nome: <span>{p.produto.nome}</span></p>
                                <p>Preco: <span>R$ {p.produto.preco}</span></p>
                                <p>Quantidade: <span>{p.quantidade}</span></p>
                            </div>
                        ))
                    }
                </div>

                <button onClick={editar}>
                    Editar forma de pagamento
                </button>
            </div>

        </div>

    )
}