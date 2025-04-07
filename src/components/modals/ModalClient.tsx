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
    }, [idCliente, contatos]);

    const limpar = () => {
        setIdClient(undefined);
        setCpf("");
        setNome("");
        setEndereco("");
        setDataNascimento(null);
        setContatos([]);
    };

    const cancelar = () => {
        limpar();
        close();
    };

    const createClient = async () => {
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

    return (
        <Modal show={open} onHide={cancelar} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{color: "var(--azul-principal)"}}>{idCliente ? `Editar ${nome}` : 'Cadastrar Cliente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <TextInput id="nameClient" label="Nome completo" saveText={setNome} text={nome} />
                    <CpfInput id="cpf" label="CPF" saveText={setCpf} text={cpf} />
                    <TextInput id="enderco" label="Endereco" saveText={setEndereco} text={endereco} />
                    <DateInput id="birthDate" label="Data de nascimento" saveDate={(date) => setDataNascimento(date ? new Date(date) : null)} date={dataNascimento?.toISOString().split('T')[0] || ""} />
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
