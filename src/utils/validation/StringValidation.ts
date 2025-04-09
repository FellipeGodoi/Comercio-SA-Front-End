export const stringValidation = (nome: string): string | null => {
    if (!nome || nome.trim() === "") {
        return "Este campo não pode ficar vazio";
    }
    return null;
};