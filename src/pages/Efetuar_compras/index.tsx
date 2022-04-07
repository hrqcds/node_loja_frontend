import "./Efetuar-compras.css"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { http } from "../../http/axios"
import { useNavigate } from "react-router-dom"
import { FiTrash } from "react-icons/fi"

interface iResponseProdutos {
    id: number
    nome: string
    descricao: string
    preco: number
    data_criacao: Date
    data_atualizacao: Date
}

interface iProdutosSelecionados {
    id?: number
    nome?: string
    preco?: number
    quantidade: number
}

export function EfetuarCompras() {

    const navigate = useNavigate()

    const [total, setTotal] = useState(0)
    const [produtos, setProduto] = useState<iResponseProdutos[]>([])
    const [select, setSelect] = useState("")
    const [quantidade, setQuantidade] = useState(1)
    const [produtosSelecionados, setProdutosSelecionados] = useState<iProdutosSelecionados[]>([])
    const [pagamento, setPagamento] = useState("")

    useEffect(() => {
        const getAllProdutos = () => {
            http.get("/produtos").then(response => { setProduto(response.data.produtos) }).catch(e => console.log(e))
        }

        getAllProdutos()
    }, [])

    const adicionarProduto = () => {

        const ps = produtosSelecionados

        if (!select) {
            toast.error("Produto não selecionado", {
                duration: 1250
            })
            return
        }

        const pItem = produtos.find(p => p.id === Number(select))
        const precoCorreto = !pItem?.preco ? 0 : pItem.preco
        setTotal(total + precoCorreto * quantidade)
        const psExist = produtosSelecionados.findIndex(p => p.id === Number(select))

        if (psExist != -1) {
            ps[psExist].quantidade += quantidade
            setProdutosSelecionados(ps)
            setSelect("")
            setQuantidade(1)
            toast.success("Produto adicionado", {
                duration: 1250
            })
            return
        }

        ps.push({ id: pItem?.id, nome: pItem?.nome, preco: pItem?.preco, quantidade })
        setProdutosSelecionados(ps)
        setSelect("")
        setQuantidade(1)
        toast.success("Produto adicionado", {
            duration: 1250
        })
        return

    }

    const removerProduto = (id: number | undefined) => {

        if (produtosSelecionados.length < 1 || !id) {
            toast.error("Nenhum produto foi selecionado", {
                duration: 1250
            })
            return
        }

        const index = produtosSelecionados.findIndex(p => p.id === Number(id))
        const p = produtosSelecionados
        setTotal(total - Number(p[index].preco) * produtosSelecionados[index].quantidade)
        p.splice(index, 1)
        setProdutosSelecionados(p)
        toast.success("Item removido")
        return
    }

    const efetuar = async () => {


        if (produtosSelecionados.length < 1) {
            toast.error("Produtos não adicionados", {
                duration: 1250
            })
            return
        }

        if (pagamento === "") {
            toast.error("Selecione uma forma de pagamento", {
                duration: 1250
            })
            return
        }

        try {


            await http.post("/compras/create", {
                tipo_pagamento: pagamento,
                status: "aguardando",
                produtos: produtosSelecionados
            })

            toast.success("Compra efetuada com sucesso, aguardando aprovação",)
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
            <h1>Compra de produtos - Total: R$ {total}</h1>
            <div className="cabecalho-p">

                <div>
                    <p>
                        Tipo de pagamento
                    </p>
                    <select value={pagamento} onChange={e => setPagamento(e.target.value)}>
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="credito">Credito</option>
                        <option value="debito">Debito</option>
                        <option value="dinheiro">Dinheiro</option>
                    </select>
                </div>

                <div >

                    <p>
                        Produtos
                    </p>
                    <select value={select} onChange={e => setSelect(e.target.value)}>
                        <option value="" disabled>Selecione um produto</option>
                        {produtos.map(p => (
                            <option value={p.id} key={p.id}>{` ${p.nome} - R$ ${p.preco}`}</option>
                        ))}
                    </select>

                    <p>
                        Quantidade
                    </p>
                    <input
                        type="number"
                        min={1} max={99}
                        value={quantidade}
                        onChange={e => setQuantidade(Number(e.target.value))} />

                </div>
                <button onClick={adicionarProduto}>Adicionar produto</button>

                <div className="cabecalho-produtos">
                    <h2>Lista de Produtos</h2>
                    {
                        produtosSelecionados.map(p => (

                            <div className="teste">
                                <p key={p.id}>
                                    Código: <span>{p.id}</span> - Nome: <span>{p.nome}</span> - Preco: <span>{p.preco}</span> - Quantidade: <span>{p.quantidade}</span>
                                </p>
                                <button
                                    onClick={() => removerProduto(p.id)}>
                                    <FiTrash />
                                </button>
                            </div>

                        ))
                    }
                </div>

            </div>

            <button style={{ marginTop: "1rem" }} onClick={efetuar}>
                Efetuar compra
            </button>
        </div>

    )
}