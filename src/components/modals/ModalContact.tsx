import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {Contact} from "../../types/Contact.ts";
import {createContactService, updateContactService} from "../../utils/services/ContactService.ts";
import TextInput from "../inputs/TextInput.tsx";

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
                <Modal.Header closeButton>
                    {contact ? `Editar ${contact.valor}` : "Cadastrar novo Contato"}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextInput id="tipoContato" label="tipo de contato" text={tipo}  saveText={setTipo} />
                        <TextInput id="valorContato" label="valor contato ( email, telefone, redes sociais, etc )" text={valor}  saveText={setValor} />
                        <TextInput id="observacaoContato" label="observações" text={observacao}  saveText={setObservacao} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {contact ? "Salvar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContactModal;