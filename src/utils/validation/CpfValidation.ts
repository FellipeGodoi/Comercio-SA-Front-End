export const validCpf = (cpf: string): string | null => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        return 'Verifique se o cpf esta completo';
    }
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
        return 'CPF inválido.';
    }

    return null;
};
