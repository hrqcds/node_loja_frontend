import { useState } from "react"
import toast from "react-hot-toast"
import { http } from "../../http/axios"
import { useNavigate } from "react-router-dom"

export function CriarProdutos() {

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState(0)

    const navigate = useNavigate()

    const criar = async () => {

        if (!nome || !descricao || !preco) {
            toast.error("Campos obrigatórios estão vázios", {
                duration: 1250,
            })
            return
        }

        try {

            await http.post("/produtos/create", {
                nome, descricao, preco
            })

            toast.success("Produto cadastrado com sucesso",)
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
            <h1>Cadastro de produtos</h1>

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
                    <input name="preco" type="number" value={preco} placeholder="Insira o nome do produto" min={1} onChange={e => setPreco(Number(e.target.value))} />
                </p>

            </label>


            <button onClick={criar}>
                Cadastrar produto
            </button>
        </div>

    )
}