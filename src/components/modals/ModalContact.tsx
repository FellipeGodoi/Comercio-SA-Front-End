import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {Contact} from "../../data/types/Contact.ts";
import {createContactService, updateContactService} from "../../utils/services/ContactService.ts";
import TextInput from "../inputs/TextInput.tsx";
import BigTextInput from "../inputs/BigTextInput.tsx";

type ContactModalProps = {
    open: boolean;
    close: () => void;
    contact?: Contact;
    idClient?: number;
    onSave: (contact: Contact) => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ open, close, contact, idClient, onSave }) => {
    const [id, setId] = useState<number | undefined>(contact?.id);
    const [tipo, setTipo] = useState<string>(contact?.tipo || "");
    const [valor, setValor] = useState<string>(contact?.valor || "");
    const [observacao, setObservacao] = useState<string>(contact?.observacao || "");


    useEffect(() => {
        if (contact) {
            setId(contact.id);
            setTipo(contact.tipo);
            setValor(contact.valor);
            setObservacao(contact?.observacao || "");

        }
    }, [contact]);

    const cancel = () => {
        setId(undefined);
        setTipo("");
        setValor("");
        setObservacao("");
        setTipo("")
        close();
    };

    const handleSave = async () => {
        const newContact : Contact = ({
            id,
            tipo: tipo,
            valor: valor,
            observacao : observacao || "",

        });

        if (contact?.id) {
            const updatedContact = await updateContactService(newContact);
            if (updatedContact) {
                onSave(updatedContact);
            }
        } else if (idClient) {
            const createdContact = await createContactService(newContact, idClient);
            if (createdContact) {
                onSave(createdContact);
            }
        }

        cancel();
    };

    return (
        <>
            <Modal show={open} onHide={cancel} backdrop="static">
                <Modal.Header  closeButton>
                    <Modal.Title className="Title" style={{color: "var(--azul-principal)"}}>
                        {contact ? `Editar ${contact.valor}` : "Cadastrar novo Contato"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextInput id="tipoContato" label="tipo de contato" text={tipo}  saveText={setTipo} />
                        <TextInput id="valorContato" label="valor contato ( email, telefone, redes sociais, etc )" text={valor}  saveText={setValor} />
                        <BigTextInput id="observacaoContato" label="observações" text={observacao}  saveText={setObservacao} rows={3} placeholder={"Ligar entre os horarios..."}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary border-0 fw-semibold" onClick={cancel} style={{backgroundColor: "var(--laranja)"}}>
                        Cancelar
                    </Button>
                    <Button variant="primary border-0 fw-semibold" onClick={handleSave} style={{backgroundColor: "var(--azul-principal)"}}>
                        {contact ? "Salvar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContactModal;