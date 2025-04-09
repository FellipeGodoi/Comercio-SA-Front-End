import {useState, useEffect} from "react";
import {Client} from "../../data/types/Client.ts";
import AxiosClient from "../../utils/axios/AxiosClient.ts";
import {Container, InputGroup, Form, Button, Table} from "react-bootstrap";
import ModalClient from "../../components/modals/ModalClient.tsx";

export default function ListClientsPage() {

    const [clients, setClients] = useState<Client[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [modalClient, setModalClient] = useState<{
        show: boolean;
        editIndex: number | null;
    }>({ show: false, editIndex: null });


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const resp = await AxiosClient.get(`clients?filter=` + encodeURIComponent(filtro));
                setClients(resp.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClients();
    }, [filtro, modalClient]);

    const openModal = (index: number | null) => {
        setModalClient({
            show: true,
            editIndex: index,
        });
    };

    const closeModal = () => {
        setModalClient({
            show: false,
            editIndex: null,
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(e.target.value);
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center mt-3 mt-lg-5">
                <ModalClient
                    open={modalClient.show}
                    close={closeModal}
                    idCliente={modalClient.editIndex !== null ? clients[modalClient.editIndex].id : undefined}
                />
                <Container className="align-middle">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Busque por nome ou cpf"
                            id="searchClient"
                            value={filtro}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                    <Table hover striped responsive="lg"
                           className=" table-client w-100">
                        <thead className="client-table-head" >
                        <tr>
                            <th className="col-3 text-start" style={{color: "var(--azul-principal) "}}>CPF</th>
                            <th className="col-6 text-start" style={{color: "var(--azul-principal) "}}>Nome</th>
                            <th className="col-3">
                                <Button className="w-100 cad-client-button fw-bold border-0"
                                        style={{backgroundColor: "var(--azul-principal"}}
                                        onClick={() => openModal(null)}>
                                    Cadastrar Cliente
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="client-table-row">
                        {clients.map((client, index) => (
                            <tr key={index} className="text-start">
                                <td className="" onClick={() => openModal(index)}>
                                    {client.cpf}
                                </td>
                                <td onClick={() => openModal(index)}>{client.nome}</td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>


                </Container>
            </div>
        </>
    )
}