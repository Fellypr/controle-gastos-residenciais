import { useEffect, useState } from "react";
import {
  cadastrarMorador,
  deletarMorador,
  obterTodosOsMoradores,
} from "../services/MoradoresService";
import type { CadastrarMoradorDto, MoradorResponseDto } from "../types/Moradores";

export function useMoradores(){
    const [moradores, setMoradores] = useState<MoradorResponseDto[]>([]);
    const [nome, setNome] = useState<string>("");
    const [idade, setIdade] = useState<string>("");
    const [carregando, setCarregando] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string|null>(null);
    const [erro, setErro] = useState<string|null>(null);

    async function buscarMoradores() {
        try {
            setCarregando(true);
            setErro("");
            const resposta = await obterTodosOsMoradores();
            setMoradores(resposta);
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Erro ao buscar moradores.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarMoradores();
    }, []);

    function limparMensagem() {
        setMensagem(null);
    }

    async function handleCadastrar(morador: CadastrarMoradorDto) {
        if (!morador.nome.trim()) {
            setErro("Informe o nome do morador.");
            return;
        }

        if (!String(morador.idade).trim()) {
            setErro("Informe a idade do morador.");
            return;
        }

        try {
            setCarregando(true);
            setErro("");
            setMensagem("");
            const novoMorador = await cadastrarMorador(morador);
            setMoradores((estadoAtual) => [...estadoAtual, novoMorador]);
            setNome("");
            setIdade("");
            setMensagem("Morador cadastrado com sucesso.");
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Erro ao cadastrar morador.");
        } finally {
            setCarregando(false);
        }
    }

    async function handleExcluir(id: number) {
        try {
            setCarregando(true);
            setErro("");
            setMensagem("");

            await deletarMorador(id);

            setMoradores((estadoAtual) => estadoAtual.filter((morador) => morador.id !== id));

        } catch (error) {
            setErro(error instanceof Error ? error.message : "Erro ao deletar morador.");
        } finally {
            setCarregando(false);
        }
    }

    return {
        moradores,
        nome,
        idade,
        carregando,
        mensagem,
        erro,
        setNome,
        setIdade,
        handleCadastrar,
        handleExcluir,
        limparMensagem,
    };
}
