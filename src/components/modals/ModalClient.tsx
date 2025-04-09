import AxiosClient from "../../utils/axios/AxiosClient.ts";
import {createClientService, deleteClientService, updateClientService} from "../../utils/services/ClientService.ts";
import {useEffect, useState} from "react";
import {Contact} from "../../data/types/Contact.ts";
import {Client} from "../../data/types/Client.ts";
import {Modal, Button} from "react-bootstrap";
import TextInput from "../inputs/TextInput.tsx";
import CpfInput from "../inputs/CpfInput.tsx";
import DateInput from "../inputs/DateInput.tsx";
import ContactList from "../lists/ContactList.tsx";
import {validCpf} from "../../utils/validation/CpfValidation.ts";
import {birthDateValidation} from "../../utils/validation/BirthDateValidation.ts";
import {stringValidation} from "../../utils/validation/StringValidation.ts";

type ClientModalType = {
    open: boolean;
    close: () => void;
    idCliente?: number;
};

const ModalClient: React.FC<ClientModalType> = ({ open, close, idCliente }) => {
    const [id, setIdClient] = useState<number | undefined>(undefined);
    const [cpf, setCpf] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
    const [endereco, setEndereco] = useState<string>("");
    const [contatos, setContatos] = useState<Contact[]>([]);

    const [nomeError, setNomeError] = useState<string|null>("");
    const [cpfError, setCpfError] = useState<string | null >(null);
    const [dataNascimentoError, setDataNascimentoError] = useState<string | null >(null);

    useEffect(() => {
        const buscaCliente = async (id: number) => {
            try{
                const response = await AxiosClient.get(`clients/${id}`);
                const client = response.data;
                setIdClient(client.id);
                setCpf(client.cpf);
                setNome(client.nome);
                setEndereco(client.endereco);
                setDataNascimento(client.dataNascimento ? new Date(client.dataNascimento) : null);
                setContatos(client.contatos || []);

            } catch (error) {
                console.error('Erro ao buscar dados do cliente:', error);

            }
        }
        if (idCliente) {
            buscaCliente(idCliente);
        } else {
            limpar();
        }
    }, [idCliente]);

    const limpar = () => {
        setIdClient(undefined);
        setCpf("");
        setNome("");
        setEndereco("");
        setDataNascimento(null);
        setContatos([]);
        setCpfError(null);
        setDataNascimentoError(null);
        setNomeError(null);
    };

    const cancelar = () => {
        limpar();
        close();
    };

    const createClient = async () => {
        const isValid = await validData();
        console.log(isValid);
        if (!isValid) return;

        const newClient: Client = {
            cpf,
            nome,
            endereco,
            dataNascimento: dataNascimento || new Date(),
        };

        const result = await createClientService(newClient);
        if (result) {
            limpar();
            cancelar();
        }
    };

    const updateClient = async () => {
        const isValid = await validData();
        if (!isValid) return;

        const updatedClient: Client = {
            id,
            cpf,
            nome,
            endereco,
            dataNascimento: dataNascimento || new Date(),
        };

        const result = await updateClientService(updatedClient);
        if (result) {
            limpar();
            cancelar();
        }
    };

    const removeClient = async () => {
        if (id) {
            const result = await deleteClientService(id);
            if (result) {
                limpar();
                cancelar();
            }
        } else {
            console.error("CPF não encontrado para deletar.");
        }
    };

    const validData = async (): Promise<boolean> => {
        const erroCpf = validCpf(cpf);
        const erroNascimento = birthDateValidation(dataNascimento);
        const erroNome = stringValidation(nome);

        setCpfError(erroCpf);
        setDataNascimentoError(erroNascimento);
        setNomeError(erroNome);

        return !erroCpf && !erroNascimento && !erroNome;
    };

    return (
        <Modal show={open} onHide={cancelar} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{color: "var(--azul-principal)"}}>{idCliente ? `Editar ${nome}` : 'Cadastrar Cliente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <TextInput id="nameClient" label="Nome completo" saveText={setNome} text={nome} error={nomeError} />
                    <CpfInput id="cpf" label="CPF" saveText={setCpf} text={cpf} error={cpfError}/>
                    <DateInput id="birthDate" label="Data de nascimento" error={dataNascimentoError} saveDate={(date) => setDataNascimento(date ? new Date(date) : null)} date={dataNascimento?.toISOString().split('T')[0] || ""} />
                    <TextInput id="enderco" label="Endereco" saveText={setEndereco} text={endereco} />
                </form>
                {idCliente && <ContactList contacts={contatos} idClient={idCliente} onUpdateContacts={setContatos} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary fw-semibold border-0" onClick={cancelar} style={{backgroundColor: "var(--laranja)"}}>Cancelar</Button>
                {idCliente ? (
                    <>
                        <Button variant="danger fw-semibold border-0" onClick={removeClient}>Deletar Cliente</Button>
                        <Button variant="primary fw-semibold border-0" onClick={updateClient} style={{backgroundColor: "var(--azul-principal)"}}>Salvar</Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={createClient} style={{backgroundColor: "var(--azul-principal)"}}>Cadastrar</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ModalClient;
