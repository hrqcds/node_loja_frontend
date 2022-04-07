import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { http } from "../../http/axios"
import { useNavigate, useParams } from "react-router-dom"

export function EditarProdutos() {

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState(0)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        const getProduto = async () => {

            const response = await http.get(`/produtos/find/${id}`)

            setNome(response.data.produto.nome)
            setDescricao(response.data.produto.descricao)
            setPreco(response.data.produto.preco)

        }

        getProduto().catch(e => console.log(e))

    }, [])


    const editar = async () => {

        if (!nome || !descricao || !preco) {
            toast.error("Campos obrigatórios estão vázios", {
                duration: 1250,
            })
            return
        }

        try {

            await http.put(`/produtos/update/${id}`, {
                nome, descricao, preco
            })

            toast.success("Produto atualizado com sucesso", {
                duration: 1250
            })
            return navigate("/produtos")
        } catch (e) {

            toast.error("Erro na requisição", {
                duration: 1250,
            })
            return

        }
    }

    return (
        <div>
            <h1>Edição de produtos</h1>

            <p>
                Nome do produto
                <label htmlFor="name"></label>
                <input name="name" type="text" value={nome} placeholder="Insira o nome do produto" onChange={(e => setNome(e.target.value))} />
            </p>

            <p>
                Descrição do produto
                <label htmlFor="descricao"></label>
                <input name="descricao" type="text" value={descricao} placeholder="Insira uma descrição do produto" onChange={(e => setDescricao(e.target.value))} />
            </p>

            <label htmlFor="preco">
                <p>
                    Preço do produto
                    <label htmlFor="preco"></label>
                    <input name="preco" type="number" value={preco} placeholder="Insira o nome do produto" min={1} onChange={e => setPreco(Number(e.target.value))} />
                </p>

            </label>


            <button onClick={editar}>
                Editar produto
            </button>
        </div>

    )
}