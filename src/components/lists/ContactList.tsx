import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import {Contact} from "../../data/types/Contact.ts";
import {deleteContactService} from "../../utils/services/ContactService.ts";
import ModalContact from "../modals/ModalContact.tsx";

type ContactListProps = {
    contacts: Contact[];
    idClient: number | null;
    onUpdateContacts: (updatedContacts: Contact[]) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, idClient, onUpdateContacts }) => {
    const [contactModal, setContactModal] = useState<{ show: boolean; editIndex: number | null }>({
        show: false,
        editIndex: null,
    });

    const openContactModal = (index: number | null) => {
        setContactModal({ show: true, editIndex: index });
    };

    const closeContactModal = () => {
        setContactModal({ show: false, editIndex: null });
    };

    const handleDeleteContact = async (contact: Contact) => {
        const result = await deleteContactService(contact);
        if (result) {
            onUpdateContacts(contacts.filter((crd) => crd.id !== contact.id));
        }
    };

    const handleSaveContact = (updatedContact: Contact) => {
        if (contactModal.editIndex !== null) {
            const updatedContacts = contacts.map((contact, index) =>
                index === contactModal.editIndex ? updatedContact : contact
            );
            onUpdateContacts(updatedContacts);
        } else {
            onUpdateContacts([...contacts, updatedContact]);
        }
        closeContactModal();
    };

    return (
        <>
            {contactModal.show && <div className="overlay"></div>}
            <ModalContact
                open={contactModal.show}
                close={closeContactModal}
                contact={contactModal.editIndex !== null ? contacts[contactModal.editIndex] : undefined}
                idClient={idClient ? idClient : undefined}
                onSave={handleSaveContact}
            />

            <Table striped hover>
                <thead>
                <tr>
                    <th>Contatos</th>
                    <th className="col-1 text-center">
                        <Button className="border-0" onClick={() => openContactModal(null)} style={{backgroundColor : "var(--azul-principal"}}> + </Button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td onClick={() => openContactModal(index)}>{`Contato ${index + 1}`}</td>
                        <td className="col-1 text-center">
                            <Button className="ri-delete-bin-5-fill border-0" onClick={() => handleDeleteContact(contact)}  style={{backgroundColor : "var(--laranja)"}}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default ContactList;