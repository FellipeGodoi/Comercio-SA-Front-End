export class Contact {
    id?: number;
    tipo: string;
    valor: string;
    observacao?: string;

    constructor(
                tipo: string,
                valor: string,
                observacao?: string,
                id?: number,
                ) {
        this.id = id;
        this.tipo = tipo;
        this.valor= valor;
        this.observacao = observacao;
    }
}