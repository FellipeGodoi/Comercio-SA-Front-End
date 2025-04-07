import {Contact} from "./Contact.ts";

export class Client {
    id?: number;
    cpf: string;
    nome: string;
    dataNascimento: Date;
    endereco: string;
    contatos?: Contact[];

    constructor(
        cpf: string,
        nome: string,
        dataNascimento: Date,
        endereco: string,
        id?: number,
        contatos?: Contact[]
    ) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.id = id;
        this.contatos = contatos;
    }
}