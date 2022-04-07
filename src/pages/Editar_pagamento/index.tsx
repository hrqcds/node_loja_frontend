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

    // const adicionarProduto = () => {

    //     const ps = produtosSelecionados

    //     if (!select) {
    //         toast.error("Produto não selecionado", {
    //             duration: 1250
    //         })
    //         return
    //     }

    //     const pItem = produtos.find(p => p.id === Number(select))
    //     const precoCorreto = !pItem?.preco ? 0 : pItem.preco
    //     setTotal(total + precoCorreto * quantidade)
    //     const psExist = produtosSelecionados.findIndex(p => p.id === Number(select))

    //     if (psExist != -1) {
    //         ps[psExist].quantidade += quantidade
    //         setProdutosSelecionados(ps)
    //         setSelect("")
    //         setQuantidade(1)
    //         toast.success("Produto adicionado", {
    //             duration: 1250
    //         })
    //         return
    //     }

    //     ps.push({ id: pItem?.id, nome: pItem?.nome, preco: pItem?.preco, quantidade })
    //     setProdutosSelecionados(ps)
    //     setSelect("")
    //     setQuantidade(1)
    //     toast.success("Produto adicionado", {
    //         duration: 1250
    //     })
    //     return

    // }

    // const removerProduto = (id: number | undefined) => {

    //     if (produtosSelecionados.length < 1 || !id) {
    //         toast.error("Nenhum produto foi selecionado", {
    //             duration: 1250
    //         })
    //         return
    //     }

    //     const index = produtosSelecionados.findIndex(p => p.id === Number(id))
    //     const p = produtosSelecionados
    //     setTotal(total - Number(p[index].preco) * produtosSelecionados[index].quantidade)
    //     p.splice(index, 1)
    //     setProdutosSelecionados(p)
    //     toast.success("Item removido")
    //     return
    // }

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
        <div>
            <h1>Editar Pagamento - Total: R$ {total}</h1>

            <p>
                Código da compra: {produtosSelecionados?.id}
            </p>

            <p>
                Status da compra: {produtosSelecionados?.status}
            </p>
            <p>

                Data da compra: {data}
            </p>

            <p>
                Tipo de pagamento
                <select value={pagamento.toLowerCase()} onChange={e => setPagamento(e.target.value)}>
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="credito">Credito</option>
                    <option value="debito">Debito</option>
                    <option value="dinheiro">Dinheiro</option>
                </select>
            </p>
            <div>
                <div>
                    {
                        produtosSelecionados?.listaDeProdutos.map(p => (
                            <div key={p.produto.id}>
                                <p>Código: {p.produto.id}</p>
                                <p>Nome: {p.produto.nome}</p>
                                <p>Preco: {p.produto.preco}</p>
                                <p>Quantidade: {p.quantidade}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

            <button onClick={editar}>
                Editar forma de pagamento
            </button>
        </div>

    )
}