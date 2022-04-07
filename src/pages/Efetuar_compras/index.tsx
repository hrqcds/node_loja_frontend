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
        const getAllProdutos = async () => {
            const response = await http.get("/produtos")

            setProduto(response.data.produtos)

        }

        getAllProdutos().catch(e => console.log(e))
    })

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

    }

    const removerProduto = (id: number | undefined) => {

        if (produtosSelecionados.length < 1 || !id) {
            toast.error("Nenhum produto foi selecionado", {
                duration: 1250
            })
            return
        }

        const index = produtosSelecionados.findIndex(p => p.id === Number(id))
        setTotal(total - Number(produtosSelecionados[index].preco) * produtosSelecionados[index].quantidade)
        const p = produtosSelecionados
        p.splice(index, 1)
        setProdutosSelecionados(p)
        toast.success("Item removido")
    }

    const efetuar = async () => {


        if (produtosSelecionados.length < 1) {
            toast.error("Produtos não adicionados", {
                duration: 1250
            })
            return
        }

        if (!pagamento) {
            toast.error("Selecione uma forma de pagamento", {
                duration: 1250
            })
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
        <div>
            <h1>Compra de produtos - Total: R$ {total}</h1>

            <p>
                Tipo de pagamento
                <select value={pagamento} onChange={e => setPagamento(e.target.value)}>
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="credito">Credito</option>
                    <option value="debito">Debito</option>
                    <option value="dinheiro">Dinheiro</option>
                </select>
            </p>
            <div>
                <p>
                    Produtos:
                    <select value={select} onChange={e => setSelect(e.target.value)}>
                        <option value="" disabled>Selecione um produto</option>
                        {produtos.map(p => (
                            <option value={p.id} key={p.id}>{` ${p.nome} - R$ ${p.preco}`}</option>
                        ))}
                    </select>
                </p>
                <p>
                    Quantidade:
                    <input
                        type="number"
                        min={1} max={99}
                        value={quantidade}
                        onChange={e => setQuantidade(Number(e.target.value))} />
                </p>

                <div>
                    {
                        produtosSelecionados.map(p => (
                            <div key={p.id}>
                                <p>Código: {p.id}</p>
                                <p>Mome: {p.nome}</p>
                                <p>Preco: {p.preco}</p>
                                <p>Quantidade: {p.quantidade}</p>
                                <button onClick={() => removerProduto(p.id)}>
                                    <FiTrash />
                                </button>
                            </div>
                        ))
                    }
                </div>

                <button onClick={adicionarProduto}>Adicionar produto</button>
            </div>

            <button onClick={efetuar}>
                Efetuar compra
            </button>
        </div>

    )
}