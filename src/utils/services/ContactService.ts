import AxiosClient from "../axios/AxiosClient.ts";
import {Contact} from "../../data/types/Contact.ts";


export const createContactService = async (contact: Contact, id: number) => {
    try {
        const url = `contacts/${id}`;
        const response = await AxiosClient.post(url, contact);

        if (response.status === 200) {
            console.log('Contato cadastrado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao cadastrar esse contato, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const updateContactService = async (contact: Contact) => {
    try {
        const url = `contacts/${contact.id}`;
        const response = await AxiosClient.put(url, contact);

        if (response.status === 200) {
            console.log('Contato atualizado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao atualizar seu contato, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteContactService = async (contact: Contact) => {
    try {
        const url = `contacts/${contact.id}`;
        const response = await AxiosClient.delete(url);

        if (response.status === 204) {
            console.log('Contato deletado com sucesso');
            return true;
        } else {
            console.error('Erro ao deletar seu contato:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar deletar contato:', error);
        return false;
    }
}