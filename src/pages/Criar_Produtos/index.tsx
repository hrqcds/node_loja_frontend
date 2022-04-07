import "./Criar-produto.css"
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
        <div className="cabecalho">
            <h1>Cadastro de produtos</h1>

            <div className="cabecalho-p">
                <div>
                    <p>
                        Nome do produto
                    </p>
                    <label htmlFor="name"></label>
                    <input name="name" type="text" value={nome} placeholder="Insira o nome do produto" onChange={(e => setNome(e.target.value))} />
                </div>

                <div>
                    <p>
                        Descrição do produto
                    </p>
                    <label htmlFor="descricao"></label>
                    <input name="descricao" type="text" value={descricao} placeholder="Insira uma descrição do produto" onChange={(e => setDescricao(e.target.value))} />
                </div>

                <div>
                    <p>
                        Preço do produto
                    </p>
                    <label htmlFor="preco">
                        <input name="preco" type="number" value={preco} placeholder="Insira o nome do produto" min={1} onChange={e => setPreco(Number(e.target.value))} />
                    </label>
                </div>


                <button onClick={criar}>
                    Cadastrar produto
                </button>
            </div>
        </div>

    )
}